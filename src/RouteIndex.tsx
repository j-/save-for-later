import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { useState, type FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { AddItemForm } from './AddItemForm';
import { listItemsOptions } from './api';
import { FormControlItemViewListOrder } from './FormControlItemViewListOrder';
import { FormControlItemViewListSortBy } from './FormControlItemViewListSortBy';
import { type ListItemsOptions } from './shared/db';
import { StoreItemListView } from './StoreItemListView';

export const RouteIndex: FC = () => {
  const [sortBy, setSortBy] = useState<ListItemsOptions['sortBy']>('dateAdded');
  const [order, setOrder] = useState<ListItemsOptions['order']>('desc');

  const {
    isLoading: listItemsLoading,
    data: listItemsData,
    dataUpdatedAt,
  } = useQuery(
    listItemsOptions({
      sortBy,
      order,
    }),
  );

  return (
    <Stack gap={4}>
      <AddItemForm />

      <Stack direction="row" gap={2}>
        <FormControlItemViewListSortBy value={sortBy} onChange={setSortBy} />
        <FormControlItemViewListOrder value={order} onChange={setOrder} />
      </Stack>

      <Box>
        {
          listItemsLoading ? <FormattedMessage id="T4VxQN" defaultMessage="Loading…" /> :
          listItemsData ? <StoreItemListView items={listItemsData} dataUpdatedAt={dataUpdatedAt} /> :
          <FormattedMessage id="MTN85Y" defaultMessage="Error loading items" />
        }
      </Box>
    </Stack>
  );
};
