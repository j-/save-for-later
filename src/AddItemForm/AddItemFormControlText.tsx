import TextField from '@mui/material/TextField';
import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

export const AddItemFormControlText: FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="text"
      control={control}
      render={({ field, fieldState }) => {
        const { ref, ...fieldProps } = field;

        return (
          <TextField
            label={
              <FormattedMessage
                id="+3Pb5I"
                defaultMessage="What do you want to remember?"
              />
            }
            autoComplete="off"
            fullWidth
            multiline
            autoFocus
            minRows={3}
            maxRows={5}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.metaKey) {
                const input = e.target as HTMLTextAreaElement;
                const form = input.form;
                form?.requestSubmit();
              }
            }}
            error={fieldState.error != null}
            title={fieldState.error?.message}
            inputRef={ref}
            slotProps={{
              inputLabel: {
                shrink: field.value != '',
              },
            }}
            {...fieldProps}
          />
        );
      }}
    />
  );
};
