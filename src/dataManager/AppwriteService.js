import { Client, Databases, Query, ID, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const db = new Databases(client);

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
};

class AuthService {
    account;

    constructor() {
        this.account = new Account(client);
    }

    async getAccountDetails() {
        let accountDetails = null;

        try {
            accountDetails = await this.account.get();
        }
        catch(err) {
            console.log(err);
        }

        return accountDetails;
    }

    async createAccount(email, password, name) {
        const response = await this.account.create(
            ID.unique,
            email,
            password,
            name
        );

        return response;
    }

    async login(email, password) {
        const response = await this.account.createEmailPasswordSession(
            email,
            password
        );

        return response;
    }

    async logout() {
        const response = await this.account.deleteSession('current');

        return response;
    }
}

export { AppwriteService, AuthService };