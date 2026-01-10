import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, type FC } from 'react';
import { Form, useForm } from 'react-hook-form';
import z from 'zod';
import { useAddItem, useClearDatabase } from './api';

export const AddItemFormSchema = z.object({
  title: z.string().trim().nonempty().optional(),
  text: z.string().trim().nonempty().optional(),
  url: z.url().nonempty().optional(),
  files: z.array(z.file()).optional(),
});

export type AddItemFormInput = z.input<typeof AddItemFormSchema>;
export type AddItemFormOutput = z.input<typeof AddItemFormSchema>;

export const AddItemForm: FC = () => {
  const {
    control,
    formState: {
      isSubmitSuccessful,
    },
    register,
    reset,
    watch,
  } = useForm<AddItemFormInput, unknown, AddItemFormOutput>({
    resolver: zodResolver(AddItemFormSchema),
  });

  const {
    mutateAsync: addItem,
  } = useAddItem();

  const {
    mutateAsync: clearDatabase,
  } = useClearDatabase();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form control={control} onSubmit={async ({ data }) => {
      const dateLapsed = new Date();
      await addItem([
        data,
        dateLapsed,
      ]);
    }}>
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
        slotProps={{
          inputLabel: {
            shrink: watch('text') != '',
          },
          htmlInput: {
            ...register('text'),
          },
        }}
      />

      <Button type="submit">
        Save for later
      </Button>

      <Button color="error" onClick={async () => {
        await clearDatabase();
      }}>
        Clear database
      </Button>
    </Form>
  );
};
