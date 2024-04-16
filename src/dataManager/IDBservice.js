class IDBservice {
    #db;

    constructor(version) {
        const request = window.indexedDB.open('xMuzikk', version);

        request.onerror = () => {
            console.log(`Error while connecting IndexedDB : ${request.error}`);
        }

        request.onupgradeneeded = (event) => {
            this.#db = event.target.result;

            if (version === 1) {
                const musicStore = this.#db.createObjectStore('music', { keyPath: 'id' })
                musicStore.createIndex('id', 'id', { unique: true });
            }
        }

        request.onsuccess = (event) => {
            this.#db = event.target.result;

            this.#db.onversionchange = () => {
                this.#db?.close();
                alert('IndexedDB is outdated, please refresh the page.');
            }
        }
    }

    get(ids) {
        return new Promise((resolve, reject) => {
            if (!this.#db)
                reject('IndexedDB is not connected.');

            const transaction = this.#db.transaction('music', 'readonly');

            const result = {
                success: [],
                fail: []
            };

            transaction.oncomplete = () => {
                resolve(result);
            }

            transaction.onerror = () => {
                reject('Transaction failed');
            }

            const musicStore = transaction.objectStore('music');

            for (const id of ids) {
                const addItemRequest = musicStore.get(id);

                addItemRequest.onsuccess = (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (addItemRequest.result)
                        result.success.push(addItemRequest.result);
                    else
                        result.fail.push(id);
                }

                addItemRequest.onerror = (error) => {
                    event.preventDefault();
                    event.stopPropagation();

                    result.fail.push(id);
                }
            }
        });
    }

    add(list) {
        return new Promise((resolve, reject) => {
            if (!this.#db)
                reject('IndexedDB is not connected.');

            const transaction = this.#db.transaction('music', 'readwrite');

            const result = {
                success: [],
                fail: []
            };

            transaction.oncomplete = () => {
                resolve(result);
            }

            transaction.onerror = () => {
                reject('Transaction failed');
            }

            const musicStore = transaction.objectStore('music');

            for (const item of list) {
                const addItemRequest = musicStore.add(item);

                addItemRequest.onsuccess = (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    result.success.push(item);
                }

                addItemRequest.onerror = (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    result.fail.push(item);
                }
            }
        });
    }
};

const idb = new IDBservice(1);
export { idb };