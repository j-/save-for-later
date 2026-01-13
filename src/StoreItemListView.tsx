import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useCallback, useMemo, type FC } from 'react';
import {
  FIELD_ITEMS_DATE_LAPSED,
  FIELD_ITEMS_ID,
  type StoreItem,
} from './api';
import { StoreItemViewWithErrorBoundary } from './StoreItemViewWithErrorBoundary';

export type StoreItemListViewProps = {
  items?: StoreItem[];
  deleteItem?: (itemId: string) => void;
};

export const StoreItemListView: FC<StoreItemListViewProps> = ({
  items,
  deleteItem,
}) => {
  const now = useMemo(() => new Date(), []);

  const lapsedBeforeNow = useMemo(() => {
    return items?.filter((item) => (
      item[FIELD_ITEMS_DATE_LAPSED] != null &&
      item[FIELD_ITEMS_DATE_LAPSED] <= now
    ));
  }, [items, now]);

  const lapsesAfterNow = useMemo(() => {
    return items?.filter((item) => (
      item[FIELD_ITEMS_DATE_LAPSED] == null ||
      item[FIELD_ITEMS_DATE_LAPSED] > now
    ));
  }, [items, now]);

  const mapStoreItemView = useCallback((item: StoreItem) => (
    <Box key={item[FIELD_ITEMS_ID]}>
      <StoreItemViewWithErrorBoundary
        item={item}
        deleteItem={
          deleteItem ?
            () => deleteItem(item[FIELD_ITEMS_ID]) :
            undefined
        }
      />
    </Box>
  ), [deleteItem]);

  return (
    <Stack gap={1}>
      {lapsedBeforeNow?.map(mapStoreItemView)}

      {
        lapsedBeforeNow && lapsedBeforeNow.length > 0 &&
        lapsesAfterNow && lapsesAfterNow.length > 1 ? (
          <Divider />
        ) :
        null
      }

      {lapsesAfterNow?.map(mapStoreItemView)}
    </Stack>
  );
};
