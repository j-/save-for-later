import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import {
  FIELD_ITEMS_DATA,
  FIELD_ITEMS_DATE_ADDED,
  FIELD_ITEMS_DATE_LAPSED,
  FIELD_ITEMS_ID,
  type StoreItem
} from './api';
import { Link } from './Link';
import { StoreItemPreview } from './StoreItemPreview';

export type StoreItemViewProps = {
  item: StoreItem;
  deleteItem?: () => void;
};

export const StoreItemView: FC<StoreItemViewProps> = ({
  item,
  deleteItem,
}) => {
  const {
    [FIELD_ITEMS_ID]: itemId,
    [FIELD_ITEMS_DATA]: data,
    [FIELD_ITEMS_DATE_ADDED]: dateAdded,
    [FIELD_ITEMS_DATE_LAPSED]: dateLapsed,
  } = item;

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack gap={2}>
        <Box>
          <StoreItemPreview data={data} />

          <Typography fontStyle="italic">
            <Link to="/item/$itemId" params={{ itemId }}>
              {itemId}
            </Link>
          </Typography>

          <Typography>
            Added: {dateAdded.toISOString()}
          </Typography>

          {dateLapsed ? (
            <Typography>
              Reminder: {dateLapsed.toISOString()}
            </Typography>
          ) : null}
        </Box>

        <Stack gap={2} direction="row">
          {deleteItem && (
            <Button
              color="error"
              variant="outlined"
              onClick={deleteItem}
            >
              Delete
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
