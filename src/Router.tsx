import Paper from '@mui/material/Paper';
import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { FC } from 'react';
import { getItemOptions, listItemsOptions, queryClient } from './api';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';
import { RouteIndex } from './RouteIndex';
import { RouteItem } from './RouteItem';
import { RouteNotFound } from './RouteNotFound';

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  notFoundComponent: RouteNotFound,
  errorComponent: ({ error, reset, info }) => (
    <ErrorBoundaryFallback
      componentStack={info?.componentStack ?? ''}
      error={error}
      eventId="rootRoute"
      resetError={reset}
    />
  ),
  component: () => (
    <Paper sx={{ mx: 'auto', my: 4, p: 2, maxWidth: '70ch' }}>
      <Outlet />
      <TanStackRouterDevtools />
    </Paper>
  ),
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(listItemsOptions),
  component: () => <RouteIndex />,
});

export const itemIdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'item/$itemId',
  loader: ({ context: { queryClient }, params: { itemId } }) =>
    queryClient.ensureQueryData(getItemOptions(itemId)),
  component: () => <RouteItem />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  itemIdRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const Router: FC = () => <RouterProvider router={router} />;
