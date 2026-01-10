import type { FC } from 'react';
import { FIELD_ITEMS_DATA, FIELD_ITEMS_ID, FIELD_ITEMS_TIMESTAMP, type StoreItem } from './api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type StoreItemViewProps = {
  item: StoreItem;
};

export const StoreItemView: FC<StoreItemViewProps> = ({ item }) => (
  <Box>
    <Typography component="pre" fontWeight="bold" fontFamily="monospace">
      {JSON.stringify(item[FIELD_ITEMS_DATA], null, 2)}
    </Typography>
    <Typography fontStyle="italic">
      {item[FIELD_ITEMS_ID]}
    </Typography>
    <Typography>
      {item[FIELD_ITEMS_TIMESTAMP].toISOString()}
    </Typography>
  </Box>
);
