import { FIELD_ITEMS_DATA, FIELD_ITEMS_DATE_ADDED, FIELD_ITEMS_DATE_LAPSED, FIELD_ITEMS_ID } from './api';
import { StoreItemView } from './StoreItemView';

export const WithTextOnly = () => (
  <StoreItemView
    item={{
      [FIELD_ITEMS_ID]: '9dcf6167-af17-4dc2-a302-dca6cb2fa8fd',
      [FIELD_ITEMS_DATE_ADDED]: new Date('2026-01-13T02:17:20.111Z'),
      [FIELD_ITEMS_DATE_LAPSED]: null,
      [FIELD_ITEMS_DATA]: {
        text: 'Hello world',
      },
    }}
    dataUpdatedAt={new Date('2026-01-13T02:17:20.111Z').getTime()}
  />
);

export const URLWithTitle = () => (
  <StoreItemView
    item={{
      [FIELD_ITEMS_ID]: '9dcf6167-af17-4dc2-a302-dca6cb2fa8fd',
      [FIELD_ITEMS_DATE_ADDED]: new Date('2026-01-13T02:17:20.111Z'),
      [FIELD_ITEMS_DATE_LAPSED]: null,
      [FIELD_ITEMS_DATA]: {
        url: 'https://skeoh.com/',
        title: 'Portfolio of J Hoeks',
      },
    }}
    dataUpdatedAt={new Date('2026-01-13T02:17:20.111Z').getTime()}
  />
);

export const URLWithTitleAndText = () => (
  <StoreItemView
    item={{
      [FIELD_ITEMS_ID]: '9dcf6167-af17-4dc2-a302-dca6cb2fa8fd',
      [FIELD_ITEMS_DATE_ADDED]: new Date('2026-01-13T02:17:20.111Z'),
      [FIELD_ITEMS_DATE_LAPSED]: null,
      [FIELD_ITEMS_DATA]: {
        url: 'https://skeoh.com/',
        title: 'Portfolio of J Hoeks',
        text: 'Some of my work',
      },
    }}
    dataUpdatedAt={new Date('2026-01-13T02:17:20.111Z').getTime()}
  />
);

export const TextInURLFormat = () => (
  <StoreItemView
    item={{
      [FIELD_ITEMS_ID]: '9dcf6167-af17-4dc2-a302-dca6cb2fa8fd',
      [FIELD_ITEMS_DATE_ADDED]: new Date('2026-01-13T02:17:20.111Z'),
      [FIELD_ITEMS_DATE_LAPSED]: null,
      [FIELD_ITEMS_DATA]: {
        text: 'https://skeoh.com/',
      },
    }}
    dataUpdatedAt={new Date('2026-01-13T02:17:20.111Z').getTime()}
  />
);
