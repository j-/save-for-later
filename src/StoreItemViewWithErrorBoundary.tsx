import * as Sentry from '@sentry/react';
import type { FC } from 'react';
import type { StoreItem } from './api';
import { StoreItemView } from './StoreItemView';
import { StoreItemViewFallback } from './StoreItemViewFallback';

export type StoreItemViewProps = {
  item: StoreItem;
  dataUpdatedAt: number;
  deleteItem?: () => void;
};

export const StoreItemViewWithErrorBoundary: FC<StoreItemViewProps> = ({
  item,
  dataUpdatedAt,
  deleteItem,
}) => (
  <Sentry.ErrorBoundary fallback={(args) => (
    <StoreItemViewFallback {...args} item={item} />
  )}>
    <StoreItemView item={item} dataUpdatedAt={dataUpdatedAt} deleteItem={deleteItem} />
  </Sentry.ErrorBoundary>
);
