import { openDB } from 'idb';

const DB_NAME = 'SleepLog';
const DB_VERSION = 2; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'log';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
        try {
            db.deleteObjectStore(DB_STORE_NAME);
        } catch (error) {
            console.log("upgrade: object doesn't exist, skip deletion.");
        }

        let store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true });

        store.createIndex('date', 'date', { unique: false });
    }
});

let getItems = async function () {
    let cursor = await (await dbPromise).transaction(DB_STORE_NAME).store.openCursor();
    let items = [];

    while (cursor) {
        items.push(cursor.value);
        cursor = await cursor.continue();
    }

    return items;
}

let addItem = async function (object) {
    return (await dbPromise).put(DB_STORE_NAME, object);
}

export { getItems, addItem };
