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
  type StoreItem,
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

export const addItem = async (
  data: ShareData,
  dateLapsed: Date | null = null,
): Promise<StoreItem> => {
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

export const getItem = async (id: string): Promise<StoreItem> => {
  const db = await getDB();
  const payload = await db.get(STORE_NAME_ITEMS, id);
  if (!payload) {
    throw new Error(`Could not find item with ID "${id}"`);
  }
  return payload;
};

/**
 * Returns a list of all stored items in order of when they were added (newest
 * first).
 */
export const listItems = async (): Promise<StoreItem[]> => {
  const db = await getDB();

  const tx = db.transaction(STORE_NAME_ITEMS, 'readonly');
  const index = tx.store.index(FIELD_ITEMS_DATE_ADDED);

  const result: StoreItem[] = [];

  for (
    let cursor = await index.openCursor(null, 'prev');
    cursor;
    cursor = await cursor.continue()
  ) {
    result.push(cursor.value);
  }

  await tx.done;

  return result;
};
