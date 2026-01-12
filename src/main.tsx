import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as Sentry from '@sentry/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { queryClient } from './api';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';
import { Router } from './Router';
import { theme } from './theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { InstallPWAProvider } from './context/InstallPWA';

Sentry.init({
  dsn: process.env.BUN_PUBLIC_SENTRY_DSN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/save-for-later\.fly\.dev\//],
  // Enable logs to be sent to Sentry
  enableLogs: true,
});

const ProfiledRouter = Sentry.withProfiler(Router);

const elem = document.getElementById('root')!;
const app = (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sentry.ErrorBoundary fallback={ErrorBoundaryFallback}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <InstallPWAProvider>
            <ProfiledRouter />
          </InstallPWAProvider>
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  const root = createRoot(elem, {
    // Callback called when an error is thrown and not caught by an ErrorBoundary.
    onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
      console.warn('Uncaught error', error, errorInfo.componentStack);
    }),
    // Callback called when React catches an error in an ErrorBoundary.
    onCaughtError: Sentry.reactErrorHandler(),
    // Callback called when React automatically recovers from errors.
    onRecoverableError: Sentry.reactErrorHandler(),
  });
  root.render(app);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => navigator.serviceWorker.ready)
    .then((reg) => reg.active?.postMessage({ type: 'PING' }))
    .catch((err) => console.error('Service Worker registration failed:', err));
}

navigator.serviceWorker.addEventListener('message', (e) => {
  if (e.data?.type === 'SW_ACTIVATED') console.log('SW activated');
});
