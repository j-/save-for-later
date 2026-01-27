import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { AddItemInterval } from './types';

export const AddItemFormControlInterval: FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="interval"
      control={control}
      render={({ field, fieldState }) => {
        const { ref, ...fieldProps } = field;

        return (
          <FormControl fullWidth size="small">
            <InputLabel size="small">
              <FormattedMessage
                id="hqW69a"
                defaultMessage="Add a reminder…"
              />
            </InputLabel>
            <Select
              size="small"
              label={
                <FormattedMessage
                  id="hqW69a"
                  defaultMessage="Add a reminder…"
                />
              }
              error={fieldState.error != null}
              title={fieldState.error?.message}
              inputRef={ref}
              {...fieldProps}
            >
              <MenuItem value={AddItemInterval.DAYS}>
                <FormattedMessage id="yfb8F1" defaultMessage="Day(s)" />
              </MenuItem>
              <MenuItem value={AddItemInterval.WEEKS}>
                <FormattedMessage id="JG/BCm" defaultMessage="Week(s)" />
              </MenuItem>
              <MenuItem value={AddItemInterval.MONTHS}>
                <FormattedMessage id="JNCob0" defaultMessage="Month(s)" />
              </MenuItem>
              <MenuItem value={AddItemInterval.YEARS}>
                <FormattedMessage id="Du0ILR" defaultMessage="Year(s)" />
              </MenuItem>
              {/* <MenuItem value={AddItemInterval.CUSTOM}>
                <FormattedMessage id="lKjjJ7" defaultMessage="Custom…" />
              </MenuItem> */}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};
