import Alert from '@mui/material/Alert';
import type { FallbackRender } from '@sentry/react';
import type { FC } from 'react';
import { FIELD_ITEMS_ID, type StoreItem } from './api';

export type StoreItemViewFallbackProps = Parameters<FallbackRender>[0] & {
  item: StoreItem;
};

export const StoreItemViewFallback: FC<StoreItemViewFallbackProps> = ({
  item,
}) => (
  <Alert severity="error">
    Failed to render item with ID "{item[FIELD_ITEMS_ID]}"
  </Alert>
);
