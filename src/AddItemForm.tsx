import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import { add } from 'date-fns';
import { type FC } from 'react';
import { Controller, Form, useForm, useWatch } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import z from 'zod';
import { addItemOptions, clearDatabaseOptions } from './api';
import { useInstallPWA } from './context/InstallPWA';

export enum AddItemInterval {
  NONE,
  CUSTOM,
  DAYS,
  WEEKS,
  MONTHS,
  YEARS,
}

export const AddItemFormSchema = z.object({
  title: z.string().trim().nonempty().optional(),
  text: z.string().trim().nonempty().optional(),
  url: z.url().nonempty().optional(),
  files: z.array(z.file()).optional(),
  count: z.coerce.number().int().min(1),
  interval: z.union([
    z.literal(''),
    z.enum(AddItemInterval),
  ])
    .transform((value) => (
      value || AddItemInterval.NONE
    )),
});

export type AddItemFormInput = z.input<typeof AddItemFormSchema>;
export type AddItemFormOutput = z.output<typeof AddItemFormSchema>;

export const AddItemForm: FC = () => {
  const {
    control,
    formState: {
      isValid,
    },
    reset,
  } = useForm<AddItemFormInput, unknown, AddItemFormOutput>({
    defaultValues: {
      text: '',
      count: 1,
      interval: '',
    },
    resolver: zodResolver(AddItemFormSchema),
    shouldFocusError: true,
  });

  const watchedInterval = useWatch({
    control,
    name: 'interval',
  });

  const {
    mutateAsync: addItem,
  } = useMutation(addItemOptions);

  const {
    mutateAsync: clearDatabase,
  } = useMutation(clearDatabaseOptions);

  const {
    isInstalled,
    isSupported,
    requestInstall,
  } = useInstallPWA();

  return (
    <Form
      control={control}
      onSubmit={async ({ data }) => {
        const dateLapsed = data.interval ? add(new Date(), {
          days: data.interval === AddItemInterval.DAYS ? data.count : 0,
          weeks: data.interval === AddItemInterval.WEEKS ? data.count : 0,
          months: data.interval === AddItemInterval.MONTHS ? data.count : 0,
          years: data.interval === AddItemInterval.YEARS ? data.count : 0,
        }) : null;

        const {
          title,
          text,
          url,
          files,
        } = data;

        await addItem([
          {
            title,
            text,
            url,
            files,
          },
          dateLapsed,
        ], {
          onSuccess: () => reset(),
        });
      }}
    >
      <Paper sx={{ p: 2, border: '1px solid', borderColor: 'primary.main' }}>
        <Stack gap={2}>
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

          <Stack component="fieldset" gap={2} direction="row" sx={{
            p: 0,
            border: 'none',
          }}>
            <FormControl fullWidth size="small">
              <InputLabel size="small">
                <FormattedMessage
                  id="hqW69a"
                  defaultMessage="Add a reminder…"
                />
              </InputLabel>
              <Controller
                name="interval"
                control={control}
                render={({ field, fieldState }) => {
                  const { ref, ...fieldProps } = field;
                  return (
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
                  );
                }}
              />
            </FormControl>

            {watchedInterval ? (
              <FormControl fullWidth size="small">
                <Controller
                  name="count"
                  control={control}
                  shouldUnregister
                  render={({ field, fieldState }) => {
                    const { ref, ...fieldProps } = field;
                    return (
                      <TextField
                        type="number"
                        placeholder="1"
                        size="small"
                        error={fieldState.error != null}
                        title={fieldState.error?.message}
                        inputRef={ref}
                        {...fieldProps}
                      />
                    );
                  }}
                />
              </FormControl>
            ) : null}
          </Stack>

          <Stack gap={2} direction="row">
            <Button type="submit" variant={isValid ? 'contained' : 'outlined'}>
              <FormattedMessage
                id="U/jWmk"
                defaultMessage="Save for later"
              />
            </Button>

            {isSupported && !isInstalled ? (
              <Button variant="outlined" onClick={() => {
                requestInstall();
              }}>
                <FormattedMessage
                  id="PRQX/4"
                  defaultMessage="Request install"
                />
              </Button>
            ) : null}

            <Button
              color="error"
              variant="outlined"
              onClick={async () => {
                await clearDatabase([]);
                reset();
              }}
              sx={{ ml: 'auto' }}
            >
              <FormattedMessage
                id="McJ37B"
                defaultMessage="Clear database"
              />
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Form>
  );
};
