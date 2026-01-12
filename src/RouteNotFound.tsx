import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLocation } from '@tanstack/react-router';
import type { FC } from 'react';

export const RouteNotFound: FC = () => {
  const { pathname } = useLocation();

  return (
    <Box mx="auto" my={4} p={2} maxWidth="70ch">
      <Stack gap={2}>
        <Typography fontFamily="monospace">
          {pathname}
        </Typography>

        <Typography component="h1" variant="h4">
          Not found
        </Typography>
      </Stack>
    </Box>
  );
};
