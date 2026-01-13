import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { FormattedMessage } from 'react-intl';

export type StoreItemPreviewProps = {
  data: ShareData;
};

const isURL = (maybeURL: string) => {
  try {
    const url = new URL(maybeURL);
    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:'
    );
  } catch {
    return false;
  }
};

export const StoreItemPreview: FC<StoreItemPreviewProps> = ({ data }) => {
  const url = data.url || (
    data.text && isURL(data.text) ? data.text : null
  );

  if (url) {
    return (
      <Button
        variant="contained"
        target="_blank"
        href={url}
        fullWidth
        sx={{ p: 1 }}
      >
        <Stack width="100%">
          {data.title && <Typography fontWeight="bold">{data.title}</Typography>}
          {data.text && <Typography>{data.text}</Typography>}
          <Typography fontStyle={data.url}>{data.url}</Typography>
        </Stack>
      </Button>
    );
  }

  if (data.text) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 1,
          color: (theme) => theme.palette.grey[200],
          backgroundColor: (theme) => theme.palette.grey[900],
        }}
      >
        {data.title && <Typography fontWeight="bold">{data.title}</Typography>}
        {data.text && <Typography>{data.text}</Typography>}
      </Paper>
    );
  }

  return (
    <Alert severity="error">
      <FormattedMessage id="+FiyOT" defaultMessage="Not supported" />
    </Alert>
  );
};
