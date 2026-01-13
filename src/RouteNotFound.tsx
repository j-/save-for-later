import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';

export const RouteNotFound: FC = () => (
  <Stack gap={2}>
    <Typography component="h1" variant="h4">
      <FormattedMessage id="TThIOM" defaultMessage="Not found" />
    </Typography>
  </Stack>
);
