import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useId, type FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { type ListItemsOptions } from './shared/db';

export type FormControlItemViewListOrderProps = {
  value: ListItemsOptions['order'];
  onChange: (newValue: ListItemsOptions['order']) => void;
};

export const FormControlItemViewListOrder: FC<FormControlItemViewListOrderProps> = ({
  value,
  onChange,
}) => {
  const id = `FormControlItemViewListOrder-${useId()}`;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${id}-order-label`} size="small">
        <FormattedMessage id="XPruqs" defaultMessage="Order" />
      </InputLabel>

      <Select
        id={`${id}-order`}
        size="small"
        labelId={`${id}-order-label`}
        label={
          <FormattedMessage id="XPruqs" defaultMessage="Order" />
        }
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        <MenuItem value="desc">
          <FormattedMessage id="MeKajs" defaultMessage="Newest first" />
        </MenuItem>
        <MenuItem value="asc">
          <FormattedMessage id="h+T3T7" defaultMessage="Oldest first" />
        </MenuItem>
      </Select>
    </FormControl>
  );
};
