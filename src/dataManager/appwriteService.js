import { Client, Databases, Query } from 'appwrite';

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
                Query.limit(1000)
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
};

export { AppwriteService };