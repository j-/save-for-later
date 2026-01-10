import Box from '@mui/material/Box';
import type { FC } from 'react';
import { FIELD_ITEMS_ID, useListItems } from './api';
import { StoreItemView } from './StoreItemView';

export const StoreItemListView: FC = () => {
  const {
    isLoading,
    data,
  } = useListItems();

  return (
    <Box>
      {isLoading ? <>Loading&hellip;</> : (
        <Box component="ol">
          {data?.map((item) => (
            <Box key={item[FIELD_ITEMS_ID]} component="li">
              <StoreItemView item={item} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
