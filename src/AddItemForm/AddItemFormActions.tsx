import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useMutation } from '@tanstack/react-query';
import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { clearDatabaseOptions } from '../api';
import { useInstallPWA } from '../context/InstallPWA';

export const AddItemFormActions: FC = () => {
  const {
    formState: {
      isValid,
    },
    reset,
  } = useFormContext();

  const {
    mutateAsync: clearDatabase,
  } = useMutation(clearDatabaseOptions);

  const {
    isInstalled,
    isSupported,
    requestInstall,
  } = useInstallPWA();

  return (
    <Stack gap={2} direction="row">
      <Button type="submit" variant={isValid ? 'contained' : 'outlined'}>
        <FormattedMessage id="U/jWmk" defaultMessage="Save for later" />
      </Button>

      {isSupported && !isInstalled ? (
        <Button variant="outlined" onClick={() => requestInstall()} >
          <FormattedMessage id="PRQX/4" defaultMessage="Request install" />
        </Button>
      ) : null}

      <Button
        color="error"
        variant="outlined"
        onClick={async () => {
          await clearDatabase([]);
          reset();
        }}
        sx={{ ml: 'auto' }}
      >
        <FormattedMessage id="McJ37B" defaultMessage="Clear database" />
      </Button>
    </Stack>
  );
};
