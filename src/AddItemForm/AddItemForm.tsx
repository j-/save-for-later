import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import { useMutation } from '@tanstack/react-query';
import { add } from 'date-fns';
import { useCallback, type FC } from 'react';
import { Form, FormProvider, useForm, useWatch, type FormSubmitHandler } from 'react-hook-form';
import { addItemOptions } from '../api';
import { AddItemFormActions } from './AddItemFormActions';
import { AddItemFormControlCount } from './AddItemFormControlCount';
import { AddItemFormControlInterval } from './AddItemFormControlInterval';
import { AddItemFormControlText } from './AddItemFormControlText';
import { AddItemFormSchema, AddItemInterval, type AddItemFormInput, type AddItemFormOutput } from './types';

export const AddItemForm: FC = () => {
  const methods = useForm<AddItemFormInput, unknown, AddItemFormOutput>({
    defaultValues: {
      text: '',
      count: 1,
      interval: '',
    },
    resolver: zodResolver(AddItemFormSchema),
    shouldFocusError: true,
  });

  const {
    control,
    reset,
  } = methods;

  const watchedInterval = useWatch({
    control,
    name: 'interval',
  });

  const {
    mutateAsync: addItem,
  } = useMutation(addItemOptions);

  const handleSubmit = useCallback<FormSubmitHandler<AddItemFormOutput>>(async ({ data }) => {
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
  }, [addItem, reset]);

  return (
    <FormProvider {...methods}>
      <Form control={control} onSubmit={handleSubmit}>
        <Stack gap={2}>
          <AddItemFormControlText />

          <Stack
            component="fieldset"
            gap={2}
            direction="row"
            sx={{
              p: 0,
              border: 'none',
            }}
          >
            <AddItemFormControlInterval />

            {watchedInterval ? <AddItemFormControlCount /> : null}
          </Stack>

          <AddItemFormActions />
        </Stack>
      </Form>
    </FormProvider>
  );
};
