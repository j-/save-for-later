import type { DBSchema } from 'idb';

export const DB_NAME = 'save-for-later';
export const DB_VERSION = 1;

export const STORE_NAME_ITEMS = 'items';
export const STORE_NAMES = [STORE_NAME_ITEMS] as const;

export const FIELD_ITEMS_ID = 'id';
export const FIELD_ITEMS_DATA = 'data';
export const FIELD_ITEMS_DATE_ADDED = 'dateAdded';
export const FIELD_ITEMS_DATE_LAPSED = 'dateLapsed';

export interface StoreItem {
  [FIELD_ITEMS_ID]: string;
  [FIELD_ITEMS_DATA]: ShareData;
  [FIELD_ITEMS_DATE_ADDED]: Date;
  [FIELD_ITEMS_DATE_LAPSED]: Date;
}

export interface SaveForLaterDB extends DBSchema {
  [STORE_NAME_ITEMS]: {
    value: StoreItem;
    key: string;
    indexes: {
      [FIELD_ITEMS_DATE_ADDED]: number;
      [FIELD_ITEMS_DATE_LAPSED]: number;
    };
  };
}
