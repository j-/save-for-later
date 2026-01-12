import { openDB } from 'idb';
import {
  DB_NAME,
  DB_VERSION,
  FIELD_ITEMS_DATE_ADDED,
  FIELD_ITEMS_DATE_LAPSED,
  FIELD_ITEMS_ID,
  STORE_NAME_ITEMS,
  STORE_NAMES,
  type SaveForLaterDB,
  type StoreItem
} from './types';

const getDB = () => (
  openDB<SaveForLaterDB>(DB_NAME, DB_VERSION, {
    upgrade(db, _oldVersion, _newVersion, _transaction, _event) {
      const store = db.createObjectStore(STORE_NAME_ITEMS, {
        keyPath: FIELD_ITEMS_ID,
      });

      store.createIndex(FIELD_ITEMS_DATE_ADDED, FIELD_ITEMS_DATE_ADDED);
      store.createIndex(FIELD_ITEMS_DATE_LAPSED, FIELD_ITEMS_DATE_LAPSED);
    },
  })
);

export const addItem = async (data: ShareData, dateLapsed: Date): Promise<StoreItem> => {
  const db = await getDB();
  const dateAdded = new Date();
  const payload: StoreItem = {
    id: crypto.randomUUID(),
    data,
    dateAdded,
    dateLapsed,
  };
  await db.add(STORE_NAME_ITEMS, payload);
  return payload;
};

export const clearDatabase = async () => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAMES, 'readwrite');
  await Promise.all(
    STORE_NAMES.map((storeName) => (
      tx.objectStore(storeName).clear()
    )),
  );
  await tx.done;
};

export const deleteItem = async (id: string): Promise<void> => {
  const db = await getDB();
  await db.delete(STORE_NAME_ITEMS, id);
};

export const listItems = async (): Promise<StoreItem[]> => {
  const db = await getDB();
  return await db.getAllFromIndex(STORE_NAME_ITEMS, FIELD_ITEMS_DATE_LAPSED);
};
