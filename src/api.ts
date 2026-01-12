import {
  useMutation,
  useQuery,
  type MutationOptions,
  type QueryOptions,
} from '@tanstack/react-query';
import { addItem, clearDatabase, deleteItem, listItems } from './shared/db';
import type { StoreItem } from './shared/types';

export * from './shared/types';

export type ClearDatabaseParameters = Parameters<typeof clearDatabase>;
export type ClearDatabaseOptions = Exclude<MutationOptions<void, unknown, ClearDatabaseParameters>, 'mutationFn'>;

export const useClearDatabase = (options?: ClearDatabaseOptions) => {
  return useMutation({
    mutationFn: async () => {
      return clearDatabase();
    },
    onSuccess: async (_data, _variables, _onMutateResult, ctx) => {
      await ctx.client.invalidateQueries();
    },
    ...options,
  });
};

export type AddItemParameters = Parameters<typeof addItem>;
export type AddItemOptions = Exclude<MutationOptions<StoreItem, unknown, AddItemParameters>, 'mutationFn'>;

export const useAddItem = (options?: AddItemOptions) => {
  return useMutation<StoreItem, unknown, AddItemParameters>({
    mutationFn: async ([data, dateLapsed]) => {
      return addItem(data, dateLapsed);
    },
    onSuccess: async (_data, _variables, _onMutateResult, ctx) => {
      await ctx.client.invalidateQueries({ queryKey: ['listItems'] });
    },
    ...options,
  });
};

export type ListItemsOptions = Exclude<QueryOptions<StoreItem[], unknown>, 'mutationFn'>;

export const useListItems = (options?: ListItemsOptions) => {
  return useQuery<StoreItem[], unknown, StoreItem[]>({
    queryKey: ['listItems'],
    queryFn: async () => {
      return listItems();
    },
    ...options,
  });
};

export type DeleteItemVariables = Parameters<typeof deleteItem>;
export type DeleteItemOptions = Exclude<MutationOptions<void, unknown, DeleteItemVariables>, 'mutationFn'>;

export const useDeleteItem = (options?: DeleteItemOptions) => {
  return useMutation<void, unknown, DeleteItemVariables>({
    mutationFn: async ([id]) => {
      return deleteItem(id);
    },
    onSuccess: async (_data, _variables, _onMutateResult, ctx) => {
      await ctx.client.invalidateQueries({ queryKey: ['listItems'] });
    },
    ...options,
  });
};
