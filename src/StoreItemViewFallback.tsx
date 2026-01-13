import Alert from '@mui/material/Alert';
import type { FallbackRender } from '@sentry/react';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { FIELD_ITEMS_ID, type StoreItem } from './api';

export type StoreItemViewFallbackProps = Parameters<FallbackRender>[0] & {
  item: StoreItem;
};

export const StoreItemViewFallback: FC<StoreItemViewFallbackProps> = ({
  item,
}) => (
  <Alert severity="error">
    <FormattedMessage
      id="UllNmI"
      defaultMessage="Failed to render item with ID `{itemId}`"
      values={{ itemId: item[FIELD_ITEMS_ID] }}
    />
  </Alert>
);
