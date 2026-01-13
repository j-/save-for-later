import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FIELD_ITEMS_DATA,
  FIELD_ITEMS_DATE_ADDED,
  FIELD_ITEMS_DATE_LAPSED,
  FIELD_ITEMS_ID,
  type StoreItem,
} from './api';
import { FormattedRelativeTime } from './FormattedRelativeTime';
import { Link } from './Link';
import { StoreItemPreview } from './StoreItemPreview';

export type StoreItemViewProps = {
  item: StoreItem;
  dataUpdatedAt: number;
  deleteItem?: () => void;
};

export const StoreItemView: FC<StoreItemViewProps> = ({
  item,
  dataUpdatedAt,
  deleteItem,
}) => {
  const {
    [FIELD_ITEMS_ID]: itemId,
    [FIELD_ITEMS_DATA]: data,
    [FIELD_ITEMS_DATE_ADDED]: dateAdded,
    [FIELD_ITEMS_DATE_LAPSED]: dateLapsed,
  } = item;

  return (
    <Paper elevation={0} sx={{ p: 0 }}>
      <Stack gap={2}>
        <Box>
          <StoreItemPreview data={data} />

          <Stack direction="row" gap={2} p={1}>
            <Typography color="textDisabled">
              Added <FormattedRelativeTime now={dataUpdatedAt} value={dateAdded} />
            </Typography>

            {dateLapsed ? (
              <Typography color="textDisabled">
                Reminder <FormattedRelativeTime now={dataUpdatedAt} value={dateLapsed} />
              </Typography>
            ) : null}

            <Typography fontStyle="italic" ml="auto">
              <Link to="/item/$itemId" params={{ itemId }} color="textDisabled">
                <FormattedMessage id="wEQDC6" defaultMessage="Edit" />
              </Link>
            </Typography>
          </Stack>
        </Box>

        {deleteItem && (
          <Stack gap={2} direction="row">
            {deleteItem && (
              <Button
                color="error"
                variant="outlined"
                onClick={deleteItem}
              >
                <FormattedMessage
                  id="K3r6DQ"
                  defaultMessage="Delete"
                />
              </Button>
            )}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
