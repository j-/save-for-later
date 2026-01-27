import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { useState, type FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { AddItemForm } from './AddItemForm/AddItemForm';
import { listItemsOptions } from './api';
import { FormControlItemViewListOrder } from './FormControlItemViewListOrder';
import { FormControlItemViewListSortBy } from './FormControlItemViewListSortBy';
import { type ListItemsOptions } from './shared/db';
import { StoreItemListView } from './StoreItemListView';
import { useItemActionDelete } from './use-item-action-delete';
import { useItemActionShare } from './use-item-action-share';
import { useItemActionView } from './use-item-action-view';

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

  const actionDelete = useItemActionDelete();
  const actionShare = useItemActionShare();
  const actionView = useItemActionView();

  return (
    <Stack gap={4}>
      <Paper sx={{ p: 2, border: '1px solid', borderColor: 'primary.main' }}>
        <AddItemForm />
      </Paper>

      <Stack direction="row" gap={2}>
        <FormControlItemViewListSortBy value={sortBy} onChange={setSortBy} />
        <FormControlItemViewListOrder value={order} onChange={setOrder} />
      </Stack>

      <Box>
        {
          listItemsLoading ? <FormattedMessage id="T4VxQN" defaultMessage="Loading…" /> :
          !listItemsData ? <FormattedMessage id="MTN85Y" defaultMessage="Error loading items" /> :
          <StoreItemListView
            items={listItemsData}
            dataUpdatedAt={dataUpdatedAt}
            deleteItem={actionDelete}
            shareItem={actionShare}
            viewItem={actionView}
          />
        }
      </Box>
    </Stack>
  );
};
