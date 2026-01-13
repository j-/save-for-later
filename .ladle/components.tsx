import type { GlobalProvider } from '@ladle/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import en from '../src/lang/en.json';
import { theme } from '../src/theme';

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const router = useMemo(() => (
    createRouter({
      history: createMemoryHistory(),
      routeTree: createRootRoute({
        component: () => <>{children}</>,
      }),
    })
  ), [children]);

  return (
    <ThemeProvider
      key={globalState.theme}
      theme={theme}
      defaultMode={globalState.theme === 'auto' ? 'system' : globalState.theme}
    >
      <CssBaseline />
      <IntlProvider locale="en" defaultLocale="en-AU" messages={en}>
        <RouterProvider router={router} />
      </IntlProvider>
    </ThemeProvider>
  );
};
