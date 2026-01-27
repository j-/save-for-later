import ChevronLeft from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { type FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { FIELD_ITEMS_DATA, getItemOptions } from './api';
import { LinkButton } from './Link';
import { indexRoute, itemIdRoute } from './Router';
import { StoreItemView } from './StoreItemView';
import { useItemActionDelete } from './use-item-action-delete';
import { useItemActionShare } from './use-item-action-share';

export const RouteItem: FC = () => {
  const { itemId } = itemIdRoute.useParams();

  const {
    isLoading,
    data: item,
    dataUpdatedAt,
  } = useQuery(getItemOptions(itemId));

  const actionDelete = useItemActionDelete();
  const actionShare = useItemActionShare();

  if (isLoading) {
    return <FormattedMessage id="T4VxQN" defaultMessage="Loading…" />;
  }

  if (!item) {
    return <FormattedMessage id="JqiqNj" defaultMessage="Something went wrong" />;
  }

  const itemData = item[FIELD_ITEMS_DATA];

  return (
    <Stack gap={4}>
      <Box>
        <LinkButton
          to={indexRoute.fullPath}
          variant="outlined"
          startIcon={<ChevronLeft />}
        >
          <FormattedMessage id="wfK8t9" defaultMessage="All items" />
        </LinkButton>
      </Box>

      <StoreItemView
        item={item}
        dataUpdatedAt={dataUpdatedAt}
        deleteItem={() => actionDelete(itemId)}
        shareItem={
          navigator.canShare(itemData) ?
            () => actionShare(itemId) :
            undefined
        }
      />
    </Stack>
  );
};
