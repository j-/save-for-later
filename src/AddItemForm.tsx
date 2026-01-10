import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { add } from 'date-fns';
import { type FC } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import z from 'zod';
import { useAddItem, useClearDatabase } from './api';

export enum AddItemInterval {
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
  interval: z.enum(AddItemInterval),
});

export type AddItemFormInput = z.input<typeof AddItemFormSchema>;
export type AddItemFormOutput = z.output<typeof AddItemFormSchema>;

export const AddItemForm: FC = () => {
  const {
    control,
    reset,
  } = useForm<AddItemFormInput, unknown, AddItemFormOutput>({
    defaultValues: {
      text: '',
      count: 1,
      interval: AddItemInterval.DAYS,
    },
    resolver: zodResolver(AddItemFormSchema),
  });

  const {
    mutateAsync: addItem,
  } = useAddItem();

  const {
    mutateAsync: clearDatabase,
  } = useClearDatabase();

  return (
    <Form
      control={control}
      onSubmit={async ({ data }) => {
        const dateLapsed = add(new Date(), {
          days: data.interval === AddItemInterval.DAYS ? data.count : 0,
          weeks: data.interval === AddItemInterval.WEEKS ? data.count : 0,
          months: data.interval === AddItemInterval.MONTHS ? data.count : 0,
          years: data.interval === AddItemInterval.YEARS ? data.count : 0,
        });

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
        ]);

        reset();
      }}
    >
      <Stack gap={2}>
        <Controller
          name="text"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label="What do you want to remember?"
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
              slotProps={{
                inputLabel: {
                  shrink: field.value != '',
                },
                htmlInput: {
                  ref: field.ref,
                },
              }}
              {...field}
            />
          )}
        />

        <Stack component="fieldset" gap={2} direction="row" sx={{
          p: 0,
          border: 'none',
        }}>
          <InputLabel component="legend">Remind me in&hellip;</InputLabel>

          <FormControl fullWidth>
            <Controller
              name="count"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  type="number"
                  placeholder="1"
                  size="small"
                  error={fieldState.error != null}
                  title={fieldState.error?.message}
                  slotProps={{
                    htmlInput: {
                      ref: field.ref,
                    },
                  }}
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name="interval"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  size="small"
                  error={fieldState.error != null}
                  title={fieldState.error?.message}
                  {...field}
                >
                  <MenuItem value={AddItemInterval.DAYS}>Day(s)</MenuItem>
                  <MenuItem value={AddItemInterval.WEEKS}>Week(s)</MenuItem>
                  <MenuItem value={AddItemInterval.MONTHS}>Month(s)</MenuItem>
                  <MenuItem value={AddItemInterval.YEARS}>Year(s)</MenuItem>
                  {/* <MenuItem value={AddItemInterval.CUSTOM}>Custom&hellip;</MenuItem> */}
                </Select>
              )}
            />
          </FormControl>
        </Stack>

        <Stack gap={2} direction="row">
          <Button type="submit" variant="contained">
            Save for later
          </Button>

          <Button color="error" onClick={async () => {
            await clearDatabase();
            reset();
          }}>
            Clear database
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};
