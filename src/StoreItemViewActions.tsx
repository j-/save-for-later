import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  FIELD_ITEMS_DATE_ADDED,
  FIELD_ITEMS_DATE_LAPSED,
  type StoreItem,
} from './api';
import { FormattedRelativeTime } from './FormattedRelativeTime';

export type StoreItemViewActionsProps = {
  item: StoreItem;
  dataUpdatedAt: number;
  deleteItem?: () => void;
  shareItem?: () => void;
  viewItem?: () => void;
};

const InlineTextButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'hoverUnderlineColor',
})<{
  hoverUnderlineColor?: string | ((theme: Theme) => string);
}>(({ theme, hoverUnderlineColor }) => ({
  minWidth: 0,
  padding: 0,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  textTransform: 'none',
  typography: 'caption',
  fontStyle: 'italic',
  fontWeight: 'inherit',
  color: theme.palette.text.disabled,
  textDecorationStyle: 'dashed',
  textUnderlineOffset: 3,
  '&:hover': {
    textDecoration: 'underline',
    textDecorationColor:
      typeof hoverUnderlineColor === 'function'
        ? hoverUnderlineColor(theme)
        : hoverUnderlineColor ?? theme.palette.text.disabled,
  },
}));

export const StoreItemViewActions: FC<StoreItemViewActionsProps> = ({
  item,
  dataUpdatedAt,
  viewItem,
  deleteItem,
  shareItem,
}) => {
  const {
    [FIELD_ITEMS_DATE_ADDED]: dateAdded,
    [FIELD_ITEMS_DATE_LAPSED]: dateLapsed,
  } = item;

  return (
    <Stack direction="row" py={1}>
      <Stack direction="row" gap={2}>
        <Typography color="textDisabled" variant="caption" ml={1}>
          Added <FormattedRelativeTime now={dataUpdatedAt} value={dateAdded} />
        </Typography>

        {dateLapsed ? (
          <Typography color="textDisabled" variant="caption">
            Reminder <FormattedRelativeTime now={dataUpdatedAt} value={dateLapsed} />
          </Typography>
        ) : null}
      </Stack>

      <Box ml="auto" />

      {viewItem && (
        <InlineTextButton
          variant="text"
          size="small"
          onClick={viewItem}
          hoverUnderlineColor={(theme) => theme.palette.primary.main}
        >
          <FormattedMessage id="FgydNe" defaultMessage="View" />
        </InlineTextButton>
      )}

      {shareItem && (
        <InlineTextButton
          variant="text"
          size="small"
          onClick={shareItem}
          hoverUnderlineColor={(theme) => theme.palette.secondary.main}
        >
          <FormattedMessage id="OKhRC6" defaultMessage="Share" />
        </InlineTextButton>
      )}

      {deleteItem && (
        <InlineTextButton
          variant="text"
          size="small"
          onClick={deleteItem}
          hoverUnderlineColor={(theme) => theme.palette.error.main}
        >
          <FormattedMessage id="K3r6DQ" defaultMessage="Delete" />
        </InlineTextButton>
      )}
    </Stack>
  );
};
