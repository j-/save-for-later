import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import {
  FIELD_ITEMS_DATA,
  FIELD_ITEMS_DATE_ADDED,
  FIELD_ITEMS_DATE_LAPSED,
  FIELD_ITEMS_ID,
  type StoreItem
} from './api';

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
      Added: {item[FIELD_ITEMS_DATE_ADDED].toISOString()}
    </Typography>
    <Typography>
      Reminder: {item[FIELD_ITEMS_DATE_LAPSED].toISOString()}
    </Typography>
  </Box>
);
