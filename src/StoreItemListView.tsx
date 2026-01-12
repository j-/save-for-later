import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useMemo, type FC } from 'react';
import { FIELD_ITEMS_DATE_LAPSED, FIELD_ITEMS_ID, useListItems } from './api';
import { StoreItemViewWithErrorBoundary } from './StoreItemViewWithErrorBoundary';

export const StoreItemListView: FC = () => {
  const {
    isLoading,
    data,
  } = useListItems();

  const now = useMemo(() => new Date(), []);

  const lapsedBeforeNow = useMemo(() => {
    return data?.filter((item) => (
      item[FIELD_ITEMS_DATE_LAPSED] <= now
    ));
  }, [data, now]);

  const lapsesAfterNow = useMemo(() => {
    return data?.filter((item) => (
      item[FIELD_ITEMS_DATE_LAPSED] > now
    ));
  }, [data, now]);

  if (isLoading) {
    return <>Loading&hellip;</>;
  }

  return (
    <Stack gap={1}>
      {lapsedBeforeNow?.map((item, i) => (
        <Box key={item[FIELD_ITEMS_ID]}>
          <StoreItemViewWithErrorBoundary item={item} />
        </Box>
      ))}

      {
        lapsedBeforeNow && lapsedBeforeNow.length > 0 &&
        lapsesAfterNow && lapsesAfterNow.length > 1 ? (
          <Divider />
        ) :
        null
      }

      {lapsesAfterNow?.map((item, i) => (
        <Box key={item[FIELD_ITEMS_ID]}>
          <StoreItemViewWithErrorBoundary item={item} />
        </Box>
      ))}
    </Stack>
  );
};
