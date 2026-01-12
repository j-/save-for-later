import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
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
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

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

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack gap={2}>
        <Box>
          <Typography component="pre" fontWeight="bold" fontFamily="monospace">
            {JSON.stringify(item[FIELD_ITEMS_DATA], null, 2)}
          </Typography>

          <Typography fontStyle="italic">
            <Link to="/item/$itemId" params={{ itemId: item[FIELD_ITEMS_ID] }}>
              {item[FIELD_ITEMS_ID]}
            </Link>
          </Typography>

          <Typography>
            Added: {item[FIELD_ITEMS_DATE_ADDED].toISOString()}
          </Typography>

          <Typography>
            Reminder: {item[FIELD_ITEMS_DATE_LAPSED].toISOString()}
          </Typography>
        </Box>

        <Stack gap={2} direction="row">
          {canDelete && (
            <Button
              color="error"
              variant="outlined"
              onClick={async () => {
                await deleteItem([item[FIELD_ITEMS_ID]], {
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
