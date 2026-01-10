import { useMutation, useQuery, type MutationOptions, type QueryOptions } from '@tanstack/react-query';
import { deleteDB, openDB, type DBSchema } from 'idb';

export const DB_NAME = 'save-for-later';
export const DB_VERSION = 1;

export const STORE_NAME_ITEMS = 'items';

export const FIELD_ITEMS_ID = 'id';
export const FIELD_ITEMS_DATA = 'data';
export const FIELD_ITEMS_TIMESTAMP = 'timestamp';

export interface StoreItem {
  [FIELD_ITEMS_ID]: string;
  [FIELD_ITEMS_DATA]: ShareData;
  [FIELD_ITEMS_TIMESTAMP]: Date;
}

interface SaveForLaterDB extends DBSchema {
  [STORE_NAME_ITEMS]: {
    value: StoreItem;
    key: string;
    indexes: {
      [FIELD_ITEMS_TIMESTAMP]: number;
    };
  };
}

const initDB = () => (
  openDB<SaveForLaterDB>(DB_NAME, DB_VERSION, {
    upgrade(db, _oldVersion, _newVersion, _transaction, _event) {
      const store = db.createObjectStore(STORE_NAME_ITEMS, {
        keyPath: FIELD_ITEMS_ID,
      });

      store.createIndex(FIELD_ITEMS_TIMESTAMP, FIELD_ITEMS_TIMESTAMP);
    },
  })
);

let db = await initDB();

export type ClearDatabaseOptions = Exclude<MutationOptions<void, unknown, void>, 'mutationFn'>;

export const useClearDatabase = (options?: ClearDatabaseOptions) => {
  return useMutation({
    mutationFn: async () => {
      db.close();
      await deleteDB(DB_NAME);
      db = await initDB();
    },
    onSuccess: async (_data, _variables, _onMutateResult, ctx) => {
      await ctx.client.invalidateQueries();
    },
    ...options,
  });
};

export type AddItemVariables = [data: ShareData, timestamp: Date];
export type AddItemOptions = Exclude<MutationOptions<StoreItem, unknown, AddItemVariables>, 'mutationFn'>;

export const useAddItem = (options?: AddItemOptions) => {
  return useMutation<StoreItem, unknown, AddItemVariables>({
    mutationFn: async ([data, timestamp]) => {
      const payload: StoreItem = {
        id: crypto.randomUUID(),
        data,
        timestamp,
      };
      await db.add(STORE_NAME_ITEMS, payload);
      return payload;
    },
    onSuccess: async (_data, _variables, _onMutateResult, ctx) => {
      await ctx.client.invalidateQueries({ queryKey: ['listItems'] });
    },
    ...options,
  });
};

export type ListItemsOptions = Exclude<QueryOptions<StoreItem[], unknown>, 'mutationFn'>;

export const useListItems = (options?: ListItemsOptions) => {
  return useQuery<StoreItem[], unknown, StoreItem[]>({
    queryKey: ['listItems'],
    queryFn: async () => {
      return await db.getAllFromIndex(STORE_NAME_ITEMS, FIELD_ITEMS_TIMESTAMP);
    },
    ...options,
  });
};
