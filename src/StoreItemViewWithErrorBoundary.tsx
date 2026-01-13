import * as Sentry from '@sentry/react';
import type { FC } from 'react';
import type { StoreItem } from './api';
import { StoreItemView } from './StoreItemView';
import { StoreItemViewFallback } from './StoreItemViewFallback';

export type StoreItemViewProps = {
  item: StoreItem;
  deleteItem?: () => void;
};

export const StoreItemViewWithErrorBoundary: FC<StoreItemViewProps> = ({
  item,
  deleteItem,
}) => (
  <Sentry.ErrorBoundary fallback={(args) => (
    <StoreItemViewFallback {...args} item={item} />
  )}>
    <StoreItemView item={item} deleteItem={deleteItem} />
  </Sentry.ErrorBoundary>
);
