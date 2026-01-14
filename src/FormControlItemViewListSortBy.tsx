import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useId, type FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { type ListItemsOptions } from './shared/db';

export type FormControlItemViewListSortByProps = {
  value: ListItemsOptions['sortBy'];
  onChange: (newValue: ListItemsOptions['sortBy']) => void;
};

export const FormControlItemViewListSortBy: FC<FormControlItemViewListSortByProps> = ({
  value,
  onChange,
}) => {
  const id = `FormControlItemViewListSortBy-${useId()}`;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${id}-sortBy-label`} size="small">
        <FormattedMessage id="hDI+JM" defaultMessage="Sort by" />
      </InputLabel>

      <Select
        id={`${id}-sortBy`}
        size="small"
        labelId={`${id}-sortBy-label`}
        label={
          <FormattedMessage id="hDI+JM" defaultMessage="Sort by" />
        }
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        <MenuItem value="dateAdded">
          <FormattedMessage id="jHN6UR" defaultMessage="Date added" />
        </MenuItem>
        <MenuItem value="dateLapsed">
          <FormattedMessage id="H256Ud" defaultMessage="Reminder date" />
        </MenuItem>
      </Select>
    </FormControl>
  );
};
