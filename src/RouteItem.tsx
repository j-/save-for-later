import ChevronLeft from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import { getItemOptions } from './api';
import { LinkButton } from './Link';
import { itemIdRoute } from './Router';
import { StoreItemView } from './StoreItemView';

export const RouteItem: FC = () => {
  const { pathname } = useLocation();
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
    <Stack gap={2}>
      <Box>
        <LinkButton
          to="/"
          variant="outlined"
          startIcon={<ChevronLeft />}
        >
          All items
        </LinkButton>
      </Box>

      <Typography fontFamily="monospace">
        {pathname}
      </Typography>

      <StoreItemView
        item={item}
        canDelete
        onAfterDeleteItem={() => navigate({ to: '/' })}
      />
    </Stack>
  );
};
