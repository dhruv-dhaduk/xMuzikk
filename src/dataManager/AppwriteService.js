import { Client, Databases, Query, ID, Account, Permission, Role } from 'appwrite';
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

    async uploadPlaylist(playlistId) {
        if (!playlistId)
            throw new Error('No playlistId provided');

        const response = await fn.createExecution(
            import.meta.env.VITE_APPWRITE_UPLOADMUSICDETAILS_FUNCTINO_ID,
            '',
            false,
            `/?playlistId=${playlistId}`
        );

        const responseBody = JSON.parse(response.responseBody);
        if (responseBody.error) {
            console.log(responseBody);
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

class PlaylistService {
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

    async fetchPlaylists(documentIds) {

        if (!documentIds?.length) {
            throw new Error('No documentIds provided to fetch playlists');
        }
        
        const response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_PLAYLISTS_COLLECTION_ID,
            [
                Query.select(['$id', 'owner', 'ytId', 'title', 'channelTitle', 'thumbnail', 'itemCount']),
                Query.limit(documentIds.length),
                Query.equal('$id', documentIds)
            ]
        );

        const playlistsMap = new Map();

        response.documents.forEach(item => {
            playlistsMap.set(item.$id, item);
        });

        return documentIds.map(id => {
            const item = playlistsMap.get(id);
            if (item) 
                return item;
            else
                return { $id: id, notFound: true };
        });
    }

    async savePlaylist(userId, playlistDocumentId) {
        if (!userId)
            throw new Error('No userId provided');

        if (!playlistDocumentId)
            throw new Error('No playlistDocumentId provided');
        
        const response = await db.createDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_SAVED_PLAYLISTS_COLLECTION_ID,
            ID.unique(),
            {
                userId,
                playlistDocumentId
            },
            [
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId))
            ]
        );

        return response;
    }

    async getSavedPlaylists(userId, limit = Number.MAX_SAFE_INTEGER) {
        if (!userId)
            throw new Error('No userId provided');

        const response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_SAVED_PLAYLISTS_COLLECTION_ID,
            [
                Query.select(['playlistDocumentId']),
                Query.limit(limit),
                Query.equal('userId', userId),
                Query.orderDesc('$createdAt')
            ]
        );

        const playlistDocumentIds = response.documents.map(item => item.playlistDocumentId);

        return playlistDocumentIds;
    }

    async removeSavedPlaylist(userId, playlistDocumentId) {
        if (!userId)
            throw new Error('No userId provided');

        if (!playlistDocumentId)
            throw new Error('No playlistDocumentId provided');

        let response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_SAVED_PLAYLISTS_COLLECTION_ID,
            [
                Query.select(['$id']),
                Query.limit(1),
                Query.equal('userId', userId),
                Query.equal('playlistDocumentId', playlistDocumentId)
            ]
        );

        if (!response?.documents?.length) {
            throw new Error('Playlist not found in saved playlists');
        }

        response = await db.deleteDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_SAVED_PLAYLISTS_COLLECTION_ID,
            response.documents[0].$id
        );

        return response;
    }

    async isPlaylistSaved(userId, playlistDocumentId) {
        if (!userId || !playlistDocumentId)
            return false;

        try {
            const response = await db.listDocuments(
                import.meta.env.VITE_APPWRITE_DB_ID,
                import.meta.env.VITE_APPWRITE_SAVED_PLAYLISTS_COLLECTION_ID,
                [
                    Query.select(['$id']),
                    Query.limit(1),
                    Query.equal('userId', userId),
                    Query.equal('playlistDocumentId', playlistDocumentId)
                ]
            );

            if (!response?.documents?.length) {
                return false;
            }
        } catch (err) {
            return false;
        }

        return true;
    }

    async createNewPlaylist(userId, title) {
        if (!userId)
            throw new Error('No userId provided');

        if (!title)
            throw new Error('No title provided');

        const response = await db.createDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_PLAYLISTS_COLLECTION_ID,
            ID.unique(),
            {
                owner: 'user',
                title,
                itemCount: 0,
            },
            [
                Permission.read(Role.users()),
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId)),
            ]
        );

        await db.createDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_USERS_PLAYLISTS_COLLECTION_ID,
            ID.unique(),
            {
                userId,
                playlistDocumentId: response.$id
            },
            [
                Permission.read(Role.user(userId)),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId))
            ]
        );

        return response.$id;
    }

    async getOwnedPlaylists(userId, limit = Number.MAX_SAFE_INTEGER) {
        if (!userId)
            throw new Error('No userId provided');

        const response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_USERS_PLAYLISTS_COLLECTION_ID,
            [
                Query.select(['playlistDocumentId']),
                Query.limit(limit),
                Query.equal('userId', userId),
                Query.orderDesc('$createdAt')
            ]
        );

        const playlistDocumentIds = response.documents.map(item => item.playlistDocumentId);

        return playlistDocumentIds;
    }

    async deletePlaylist(userId, playlistDocumentId) {
        if (!userId)
            throw new Error('No userId provided');

        if (!playlistDocumentId)
            throw new Error('No playlistDocumentId provided');

        const response = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_USERS_PLAYLISTS_COLLECTION_ID,
            [
                Query.select(['$id']),
                Query.limit(1),
                Query.equal('userId', userId),
                Query.equal('playlistDocumentId', playlistDocumentId)
            ]
        );

        if (!response?.documents?.length)
            throw new Error('Playlist not found in users playlists');

        try {
            await db.deleteDocument(
                import.meta.env.VITE_APPWRITE_DB_ID,
                import.meta.env.VITE_APPWRITE_PLAYLISTS_COLLECTION_ID,
                playlistDocumentId
            );
        } catch (err) {
            if (err.type !== 'document_not_found' && err.code !== 404) {
                throw err;
            }
        }
        
        try {
            await db.deleteDocument(
                import.meta.env.VITE_APPWRITE_DB_ID,
                import.meta.env.VITE_APPWRITE_USERS_PLAYLISTS_COLLECTION_ID,
                response.documents[0].$id
            );
        } catch (err) {
            if (err.type !== 'document_not_found' && err.code !== 404) {
                throw err;
            }
        }

    }

    async addToPlaylist(playlistDocumentId, musicId) {
        if (!playlistDocumentId)
            throw new Error('No playlistDocumentId provided');

        if (!musicId)
            throw new Error('No musicId provided');

        const playlist = await db.getDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_PLAYLISTS_COLLECTION_ID,
            playlistDocumentId,
            [
                Query.select(['$id', 'itemCount', 'items', 'thumbnail'])
            ]
        );

        if (!playlist?.$id)
            throw new Error('Playlist not found');
        
        const response1 = await db.listDocuments(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_ALLMUSIC_COLLECTION_ID,
            [
                Query.select( playlist.items.length === 0 ? ['id', 'thumbnail'] : ['id']),
                Query.limit(1),
                Query.equal('id', musicId),

            ]
        );

        if (!response1?.documents?.length || response1.documents[0].id !== musicId)
            throw new Error('Music item not found');


        if (playlist.items.includes(musicId))
            throw new Error('Music item is already in the playlist');

        const updatedPlaylistItems = [...playlist.items, musicId];

        const updatedPlaylist = {
            items: updatedPlaylistItems,
            itemCount: updatedPlaylistItems.length,
            thumbnail: playlist.items.length === 0 ? response1.documents[0].thumbnail : playlist.thumbnail
        }

        const response2 = await db.updateDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_PLAYLISTS_COLLECTION_ID,
            playlistDocumentId,
            updatedPlaylist
        );

        return response2;
    }

    async removeFromPlaylist(playlistDocumentId, musicId) {
        if (!playlistDocumentId)
            throw new Error('No playlistDocumentId provided');

        if (!musicId)
            throw new Error('No musicId provided');

        const playlist = await db.getDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_PLAYLISTS_COLLECTION_ID,
            playlistDocumentId,
            [
                Query.select(['$id', 'itemCount', 'items', 'thumbnail'])
            ]
        );

        if (!playlist?.$id)
            throw new Error('Playlist not found');

        if (!playlist.items.includes(musicId))
            throw new Error(`Music item doesn't exist in playlist`);

        const updatedPlaylistItems = playlist.items.filter(item => item !== musicId);

        let updatedThumbnail = playlist.thumbnail;

        if (updatedPlaylistItems.length === 0) {
            updatedThumbnail = null;
        }
        else if (updatedPlaylistItems.length > 0 && updatedPlaylistItems[0] !== playlist.items[0]) {

            try {
                const response = await db.listDocuments(
                    import.meta.env.VITE_APPWRITE_DB_ID,
                    import.meta.env.VITE_APPWRITE_ALLMUSIC_COLLECTION_ID,
                    [
                        Query.select(['id', 'thumbnail']),
                        Query.limit(1),
                        Query.equal('id', updatedPlaylistItems[0])
                    ]
                );

                if (!response?.documents?.length || response.documents[0].id !== updatedPlaylistItems[0]) {}
                else {
                    updatedThumbnail = response.documents[0].thumbnail;
                }
            } catch (err) {
                console.error(err);
            }
        }

        const response = await db.updateDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_PLAYLISTS_COLLECTION_ID,
            playlistDocumentId,
            {
                items: updatedPlaylistItems,
                itemCount: updatedPlaylistItems.length,
                thumbnail: updatedThumbnail
            }
        );

        return response;
    }
}

const playlistService = new PlaylistService();

export {
    AppwriteService,
    appwriteService,
    AuthService,
    authService,
    SearchService,
    searchService,
    PlaylistService,
    playlistService
};