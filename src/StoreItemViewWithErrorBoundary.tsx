import * as Sentry from '@sentry/react';
import type { FC } from 'react';
import { StoreItemView, type StoreItemViewProps } from './StoreItemView';
import { StoreItemViewFallback } from './StoreItemViewFallback';

export const StoreItemViewWithErrorBoundary: FC<StoreItemViewProps> = ({
  item,
  ...props
}) => (
  <Sentry.ErrorBoundary fallback={(args) => (
    <StoreItemViewFallback {...args} item={item} />
  )}>
    <StoreItemView item={item} {...props} />
  </Sentry.ErrorBoundary>
);
