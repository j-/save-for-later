import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { AddItemForm } from './AddItemForm';
import { listItemsOptions } from './api';
import { StoreItemListView } from './StoreItemListView';

export const RouteIndex: FC = () => {
  const {
    isLoading: listItemsLoading,
    data: listItemsData,
    dataUpdatedAt,
  } = useQuery(listItemsOptions);

  return (
    <Stack gap={2}>
      <Typography component="h1" variant="h6">
        <FormattedMessage defaultMessage="Save for later" id="U/jWmk" />
      </Typography>

      <AddItemForm />

      <Divider />

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
