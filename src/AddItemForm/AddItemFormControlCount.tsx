import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const AddItemFormControlCount: FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="count"
      control={control}
      shouldUnregister
      render={({ field, fieldState }) => {
        const { ref, ...fieldProps } = field;

        return (
          <FormControl fullWidth size="small">
            <TextField
              type="number"
              placeholder="1"
              size="small"
              error={fieldState.error != null}
              title={fieldState.error?.message}
              inputRef={ref}
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
              {...fieldProps}
            />
          </FormControl>
        );
      }}
    />
  );
};
