import { shuffleInPlace } from '../utils/shuffle.js';
import { idb } from './IDBservice.js';
import { AppwriteService } from './AppwriteService.js';

const appwriteService = new AppwriteService();

class Recommendation {
    #data;
    #currentFetchingIndex = -1;

    async init(doShuffle = true) {
        const response = await appwriteService.fetchRecommendation();
        
        const flatData = [];

        const arrayCopy = [];

        for (const lang in response) {
            arrayCopy.push(response[lang]);
        }

        if (doShuffle);
            shuffleInPlace(arrayCopy);

        arrayCopy.forEach((langSongs) => {
            if (doShuffle)
                shuffleInPlace(langSongs);
            langSongs.forEach((item) => {
                if (doShuffle)
                    shuffleInPlace(item.ids);
                flatData.push(...item.ids);
            });
        });
        
        this.#data = flatData;
        this.#currentFetchingIndex = 0;
        console.log(flatData);
    }
    
    get data() {
        if (!this.#data) {
            return [];
        }
        return [...this.#data];
    }

    async getNextMusicDetails(count = 5, resetIndex) {
        const ids = this.#data.slice(this.#currentFetchingIndex, this.#currentFetchingIndex + count);

        let dataFromIDB = {};
        try {
            dataFromIDB = await idb.get(ids);
        } catch (err) {
            console.log(`Error : ${err}`);
            dataFromIDB.success = new Map();
            dataFromIDB.fail = ids;
        }

        let dataFromAppwrite = new Map();

        try {
            if (dataFromIDB.fail.length)
                dataFromAppwrite = await appwriteService.fetchDetails(dataFromIDB.fail);
        } catch (err) {
            console.log(`Error: ${err}`);
        }

        this.#currentFetchingIndex += count;

        idb.add(
            dataFromIDB.fail
                .map((id) => dataFromAppwrite.get(id))
                .filter(item => item)
        );

        return ids.map((id) => {
            const idbData = dataFromIDB.success.get(id);
            if (idbData)
                return idbData;

            const appwriteData = dataFromAppwrite.get(id);
            if (appwriteData)
                return appwriteData;
            
            return {id, notFound: true};
        });
    }

    resetFetchingIndex(newIndex = 0) {
        this.#currentFetchingIndex = newIndex;
    }
};

export { Recommendation };