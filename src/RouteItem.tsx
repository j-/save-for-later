import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import { getItemOptions } from './api';
import { itemIdRoute } from './Router';
import { StoreItemView } from './StoreItemView';

export const RouteItem: FC = () => {
  const { itemId } = itemIdRoute.useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    data: item,
  } = useQuery(getItemOptions(itemId));

  if (isLoading) {
    return <>Loading&hellip;</>;
  }

  if (!item) {
    return <>Error</>;
  }

  return (
    <Box mx="auto" my={4} p={2} maxWidth="70ch">
      <Stack gap={2}>
        <Typography fontFamily="monospace">
          {itemId}
        </Typography>

        <StoreItemView
          item={item}
          onAfterDeleteItem={() => navigate({ to: '/' })}
        />
      </Stack>
    </Box>
  );
};
