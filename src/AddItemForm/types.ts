import z from 'zod';

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
