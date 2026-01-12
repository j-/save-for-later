import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import type { FC } from 'react';
import {
  deleteItemOptions,
  FIELD_ITEMS_DATA,
  FIELD_ITEMS_DATE_ADDED,
  FIELD_ITEMS_DATE_LAPSED,
  FIELD_ITEMS_ID,
  type StoreItem
} from './api';
import { Link } from './Link';

export type StoreItemViewProps = {
  item: StoreItem;
  canDelete?: boolean;
  onAfterDeleteItem?: () => void | Promise<void>;
};

export const StoreItemView: FC<StoreItemViewProps> = ({
  item,
  canDelete = false,
  onAfterDeleteItem,
}) => {
  const {
    mutateAsync: deleteItem,
  } = useMutation(deleteItemOptions);

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
          <Typography component="pre" fontWeight="bold" fontFamily="monospace">
            {JSON.stringify(data, null, 2)}
          </Typography>

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
          {canDelete && (
            <Button
              color="error"
              variant="outlined"
              onClick={async () => {
                await deleteItem([itemId], {
                  onSuccess: onAfterDeleteItem,
                });
              }}
            >
              Delete
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
