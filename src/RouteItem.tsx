import ChevronLeft from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { deleteItemOptions, FIELD_ITEMS_ID, getItemOptions } from './api';
import { LinkButton } from './Link';
import { indexRoute, itemIdRoute } from './Router';
import { StoreItemView } from './StoreItemView';

export const RouteItem: FC = () => {
  const { itemId } = itemIdRoute.useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    data: item,
    dataUpdatedAt,
  } = useQuery(getItemOptions(itemId));

  const {
    mutateAsync: deleteItem,
  } = useMutation(deleteItemOptions);

  if (isLoading) {
    return <FormattedMessage id="T4VxQN" defaultMessage="Loading…" />;
  }

  if (!item) {
    return <FormattedMessage id="JqiqNj" defaultMessage="Something went wrong" />;
  }

  return (
    <Stack gap={4}>
      <Box>
        <LinkButton
          to={indexRoute.path}
          variant="outlined"
          startIcon={<ChevronLeft />}
        >
          <FormattedMessage id="wfK8t9" defaultMessage="All items" />
        </LinkButton>
      </Box>

      <StoreItemView
        item={item}
        dataUpdatedAt={dataUpdatedAt}
        deleteItem={async () => {
          const itemId = item[FIELD_ITEMS_ID];
          const onSuccess = () => navigate({ to: indexRoute.path });
          await deleteItem([itemId], {
            onSuccess,
          });
        }}
      />
    </Stack>
  );
};
