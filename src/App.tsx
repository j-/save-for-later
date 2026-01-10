import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import type { FC } from 'react';
import { AddItemForm } from './AddItemForm';
import { StoreItemListView } from './StoreItemListView';

export const App: FC = () => {
  return (
    <Box mx="auto" my={4} p={2} maxWidth="70ch">
      <Stack gap={2}>
        <AddItemForm />

        <Divider />

        <Box>
          <StoreItemListView />
        </Box>
      </Stack>
    </Box>
  );
};
