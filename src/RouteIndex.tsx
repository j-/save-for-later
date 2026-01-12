import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import type { FC } from 'react';
import { AddItemForm } from './AddItemForm';
import { StoreItemListView } from './StoreItemListView';
import { useLocation } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';

export const RouteIndex: FC = () => {
  const { pathname } = useLocation();

  return (
    <Stack gap={2}>
      <Typography fontFamily="monospace">
        {pathname}
      </Typography>

      <AddItemForm />

      <Divider />

      <Box>
        <StoreItemListView />
      </Box>
    </Stack>
  );
};
