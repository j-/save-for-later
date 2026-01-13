import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export type StoreItemPreviewProps = {
  data: ShareData;
};

const isURL = (maybeURL: string) => {
  try {
    const url = new URL(maybeURL);
    return (
      url.protocol === 'http:' ||
      url.protocol === 'https'
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
        sx={{
          p: 2,
        }}
      >
        {data.title && <Typography fontWeight="bold">{data.title}</Typography>}
        {data.text && <Typography>{data.text}</Typography>}
        <Typography fontStyle={data.url}>{data.url}</Typography>
      </Button>
    );
  }

  if (data.text) {
    return (
      <Paper elevation={1} sx={{ p: 2 }}>
        {data.title && <Typography fontWeight="bold">{data.title}</Typography>}
        {data.text && <Typography>{data.text}</Typography>}
      </Paper>
    );
  }

  return (
    <Alert severity="error">
      Not supported
    </Alert>
  );
};
