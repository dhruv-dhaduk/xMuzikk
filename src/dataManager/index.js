import { shuffleInPlace } from '../utils/shuffle.js';
import { idb } from './IDBservice.js';
import { AppwriteService } from './AppwriteService.js';

const appwriteService = new AppwriteService();

class Recommendation {
    #data;

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
                flatData.push(...item.ids);
            });
        });
        
        this.#data = flatData;
    }
    
    get data() {
        return [...this.#data];
    }
};

export { Recommendation };