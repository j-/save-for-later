import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import {
  FIELD_ITEMS_DATA,
  FIELD_ITEMS_DATE_ADDED,
  FIELD_ITEMS_DATE_LAPSED,
  FIELD_ITEMS_ID,
  useDeleteItem,
  type StoreItem
} from './api';
import { Link } from './Link';

export type StoreItemViewProps = {
  item: StoreItem;
  onAfterDeleteItem?: () => void | Promise<void>;
};

export const StoreItemView: FC<StoreItemViewProps> = ({
  item,
  onAfterDeleteItem,
}) => {
  const {
    mutateAsync: deleteItem,
  } = useDeleteItem();

  return (
    <Paper sx={{ p: 2 }}>
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

      <Button
        color="error"
        onClick={async () => {
          await deleteItem([item[FIELD_ITEMS_ID]], {
            onSuccess: onAfterDeleteItem,
          });
        }}
      >
        Delete
      </Button>
    </Paper>
  );
};
