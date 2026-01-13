import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '@tanstack/react-router';
import type { FC } from 'react';
import { AddItemForm } from './AddItemForm';
import { listItemsOptions } from './api';
import { StoreItemListView } from './StoreItemListView';

export const RouteIndex: FC = () => {
  const { pathname } = useLocation();

  const {
    isLoading: listItemsLoading,
    data: listItemsData,
  } = useQuery(listItemsOptions);

  return (
    <Stack gap={2}>
      <Typography fontFamily="monospace">
        {pathname}
      </Typography>

      <AddItemForm />

      <Divider />

      <Box>
        {
          listItemsLoading ? <>Loading&hellip;</> :
          listItemsData ? <StoreItemListView items={listItemsData} /> :
          <>Error loading items</>
        }
      </Box>
    </Stack>
  );
};
