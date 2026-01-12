import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import type { FC } from 'react';
import { RouteIndex } from './RouteIndex';
import { RouteItem } from './RouteItem';
import { RouteNotFound } from './RouteNotFound';

const rootRoute = createRootRoute({
  notFoundComponent: RouteNotFound,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <RouteIndex />,
});

export const itemIdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'item/$itemId',
  component: () => <RouteItem />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  itemIdRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const Router: FC = () => <RouterProvider router={router} />;
