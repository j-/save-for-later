import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { FallbackRender } from '@sentry/react';
import { FormattedMessage } from 'react-intl';
import { clearDatabase } from './shared/db';

export const ErrorBoundaryFallback: FallbackRender = ({
  error,
  resetError,
}) => {
  return (
    <Stack spacing={2} sx={{ width: '60ch', px: 2, my: 10, mx: 'auto' }}>
      <Typography component="h1" variant="h4">
        <FormattedMessage
          id="JqiqNj"
          defaultMessage="Something went wrong"
        />
      </Typography>

      <Typography>
        <FormattedMessage
          id="dHGAHz"
          defaultMessage="The application has encountered an unexpected error and failed to initialize."
        />
      </Typography>

      <Stack direction="row" spacing={2} py={4}>
        <Button
          variant="contained"
          onClick={resetError}
        >
          <FormattedMessage
            id="FazwRl"
            defaultMessage="Try again"
          />
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            window.location.reload();
          }}
        >
          <FormattedMessage
            id="B8ZKI1"
            defaultMessage="Reload application"
          />
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={async () => {
            await clearDatabase();
            // @ts-expect-error Force reload.
            window.location.reload(true);
          }}
        >
          <FormattedMessage
            id="Ms2cf4"
            defaultMessage="Clear site data"
          />
        </Button>
      </Stack>

      <details>
        <Box component="summary" sx={{
          fontWeight: 'bold',
          color: 'grey.700',
          cursor: 'pointer',
        }}>
          <FormattedMessage
            id="qddSy6"
            defaultMessage="Error details"
          />
        </Box>

        <Paper component="pre" sx={{
          overflowX: 'auto',
          p: 2,
        }}>
          {error instanceof Error ? error.stack : String(error)}
        </Paper>
      </details>
    </Stack>
  );
};
