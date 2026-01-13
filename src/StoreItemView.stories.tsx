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

export const LongContent = () => (
  <StoreItemView
    item={{
      [FIELD_ITEMS_ID]: '9dcf6167-af17-4dc2-a302-dca6cb2fa8fd',
      [FIELD_ITEMS_DATE_ADDED]: new Date('2026-01-13T02:17:20.111Z'),
      [FIELD_ITEMS_DATE_LAPSED]: null,
      [FIELD_ITEMS_DATA]: {
        url: 'https://www.lipsum.com/?story=store-item-view--long-content&story=store-item-view--long-content&story=store-item-view--long-content&story=store-item-view--long-content&story=store-item-view--long-content&story=store-item-view--long-content',
        title: 'Lorem Ipsum - All the facts - Lipsum generator',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      },
    }}
    dataUpdatedAt={new Date('2026-01-13T02:17:20.111Z').getTime()}
  />
);
