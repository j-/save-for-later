import {
  mutationOptions,
  QueryClient,
  queryOptions,
} from '@tanstack/react-query';
import {
  addItem,
  clearDatabase,
  deleteItem,
  getItem,
  listItems,
} from './shared/db';
import type { StoreItem } from './shared/types';

export * from './shared/types';

export const queryClient = new QueryClient();

export const addItemOptions = mutationOptions<StoreItem, unknown, Parameters<typeof addItem>>({
  mutationFn: async ([data, dateLapsed]) => {
    return addItem(data, dateLapsed);
  },
  onSuccess: async (_data, _variables, _onMutateResult, ctx) => {
    await ctx.client.invalidateQueries({
      queryKey: ['listItems'],
    });
  },
});

export const clearDatabaseOptions = mutationOptions<void, unknown, Parameters<typeof clearDatabase>>({
  mutationFn: async () => {
    return clearDatabase();
  },
  onSuccess: async (_data, _variables, _onMutateResult, ctx) => {
    await ctx.client.invalidateQueries();
  },
});

export const deleteItemOptions = mutationOptions<void, unknown, Parameters<typeof deleteItem>>({
  mutationFn: async ([id]) => {
    return deleteItem(id);
  },
  onSuccess: async (_data, _variables, _onMutateResult, ctx) => {
    await ctx.client.invalidateQueries({
      queryKey: ['listItems'],
    });
  },
});

export const getItemOptions = (id: string) => queryOptions({
  queryKey: ['item', { id }],
  queryFn: async () => {
    return getItem(id);
  },
});

export const listItemsOptions = queryOptions({
  queryKey: ['listItems'],
  queryFn: async () => {
    return listItems();
  },
});
