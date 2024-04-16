class IDBservice {
    #db;

    constructor(version) {
        const request = window.indexedDB.open('xMuzikk', version);

        request.onerror = () => {
            console.log(`Error while connecting IndexedDB : ${request.error}`);
        }

        request.onupgradeneeded = (event) => {
            this.#db = event.target.result;
            console.log("ON UPGRADE NEEDED : ");

            if (version === 1) {
                console.log("CREATE THE musicStore")
                const musicStore = this.#db.createObjectStore('music', { keyPath: 'id' })
                musicStore.createIndex('id', 'id', { unique: true });
            }
        }

        request.onsuccess = (event) => {
            this.#db = event.target.result;

            console.log("IDB SUCCESS");
            console.log(this.#db);

            this.#db.onversionchange = () => {
                this.#db?.close();
                alert('IndexedDB is outdated, please refresh the page.');
            }
        }
    }
};

const idb = new IDBservice(1);
export { idb };