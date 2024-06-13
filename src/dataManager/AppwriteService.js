import { Client, Databases, Query, ID, Account } from 'appwrite';
import { Functions } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const db = new Databases(client);
const fn = new Functions(client);

class AppwriteService {
    async fetchRecommendation() {
        const response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_RECOMMENDATION_COLLECTION_ID,
            [
                Query.select(['$id', 'label', 'language', 'ids']),
                Query.limit(Number.MAX_SAFE_INTEGER)
            ]
        );

        const data = {};

        for (const item of response.documents) {
            if (!data[item.language])
                data[item.language] = [];

            data[item.language].push({ label: item.label, ids: item.ids });
        }

        return data;
    }

    async fetchDetails(ids) {
        const response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_ALLMUSIC_COLLECTION_ID,
            [
                Query.select(['id', 'title', 'thumbnail', 'duration', 'uploadTime', 'channelTitle', 'channelLink']),
                Query.limit(ids.length),
                Query.equal('id', ids)
            ]
        );

        const dataMap = new Map();

        for (const item of response.documents) {
            dataMap.set(item.id, item);
        }

        return dataMap;
    }

    async fetchPlaylist(documentId) {
        const response = await db.getDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_PLAYLISTS_COLLECTION_ID,
            documentId,
            [
                Query.select(['$id', 'owner', 'ytId', 'title', 'channelTitle', 'thumbnail', 'itemCount', 'items'])
            ]
        );

        return response;
    }
};

const appwriteService = new AppwriteService();

class AuthService {
    account;

    constructor() {
        this.account = new Account(client);
    }

    async getAccountDetails() {
        let response = null;
        let error;

        try {
            response = await this.account.get();
        }
        catch(err) {
            error = err;
        }

        return { response, error };
    }

    async createAccount(email, password, name) {
        let response = null;
        let error = null;

        try {
            response = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
        }
        catch(err) {
            error = err;
        }

        return { response, error };
    }

    async login(email, password) {
        let response;
        let error;

        try {
            response = await this.account.createEmailSession(
                email,
                password
            );
        } catch (err) {
            error = err;
        }

        return { response, error };
    }

    async logout() {
        let response;
        let error;

        try {
            response = await this.account.deleteSession('current');
        } catch (err) {
            error = err;
        }

        return { response, error };
    }
}

const authService = new AuthService();

class SearchService {
    async queryCache(q) {
        const response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_SEARCHRESULTS_COLLECTION_ID,
            [
                Query.select(['$id', 'query']),
                Query.limit(20),
                Query.search('query', q)
            ]
        );

        return response.documents;
    }

    async executeSearch(q) {
        if (!q)
            throw new Error('No query provided');
    
        const response = await fn.createExecution(
            import.meta.env.VITE_APPWRITE_SEARCH_FUNCTION_ID,
            '',
            false,
            `/?q=${encodeURIComponent(q)}`
        );
    
        const responseBody = JSON.parse(response.responseBody);
        if (responseBody.error) {
            const err = new Error(responseBody.error);
            if (responseBody.limitExceeded) {
                err.limitExceeded = true;
            }
    
            throw err;
        }
    
        return responseBody;
    }

    async uploadMusicDetails(ids) {
        if (!ids)
            throw new Error('No ids provided');

        const response = await fn.createExecution(
            import.meta.env.VITE_APPWRITE_UPLOADMUSICDETAILS_FUNCTINO_ID,
            '',
            false,
            `/?ids=${ids.join(',')}`
        );

        const responseBody = JSON.parse(response.responseBody);
        if (responseBody.error) {
            throw new Error(responseBody.error);
        }

        return responseBody;
    }

    async getSearchResults(documentId) {

        if (!documentId)
            documentId = undefined;

        const response = await db.getDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_SEARCHRESULTS_COLLECTION_ID,
            documentId,
            [
                Query.select(['query', 'ids'])
            ]
        );

        return response;
    }

    async getSearchLimit(userId) {

        let response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_SEARCHLIMIT_COLLECTION_ID,
            [
                Query.select(['limit']),
                Query.limit(1),
                Query.equal('userId', 'maxlimit')
            ]
        );

        if (response.documents.length === 0) {
            throw new Error('No max search limit found');
        }

        const maxLimit = response.documents[0].limit;

        response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_SEARCHLIMIT_COLLECTION_ID,
            [
                Query.select(['limit']),
                Query.limit(1),
                Query.equal('userId', userId)
            ]
        );

        if (response.documents.length === 0) {
            return { limit: maxLimit, maxLimit };
        }

        const limit = response.documents[0].limit;

        return { limit, maxLimit };
    }

}

const searchService = new SearchService();

export { AppwriteService, appwriteService, AuthService, authService, SearchService, searchService };