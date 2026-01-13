import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMemo, type FC } from 'react';
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
  const url = useMemo(() => {
    if (data.url) return new URL(data.url);
    if (data.text && isURL(data.text)) return new URL(data.text);
    return null;
  }, [data.url, data.text]);

  const favicon = useMemo(() => {
    if (!url) return null;
    const domain = url.hostname;
    const src = new URL('https://www.google.com/s2/favicons?sz=64');
    src.searchParams.set('domain_url', domain);
    return <img src={src.toString()} width={16} height={16} />;
  }, [url]);

  if (url) {
    return (
      <Button
        variant="contained"
        target="_blank"
        href={url.toString()}
        fullWidth
        sx={{ p: 2 }}
      >
        <Box boxSizing="border-box" width="100%" maxWidth="100%" display="flex" gap={1} alignItems="start">
          {favicon && (
            <Box py={0.5} display="inline-flex">
              {favicon}
            </Box>
          )}

          <Stack flex={1} maxWidth="100%">
            {data.title && <Typography fontWeight="bold">{data.title}</Typography>}
            {data.text && <Typography>{data.text}</Typography>}
            <Typography fontStyle={data.url} noWrap>{data.url}</Typography>
          </Stack>
        </Box>
      </Button>
    );
  }

  if (data.text) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 2,
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
