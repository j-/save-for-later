import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import { useAddItem, useClearDatabase } from './api';
import { StoreItemListView } from './StoreItemListView';

export const App: FC = () => {
  const {
    mutateAsync: addItem,
  } = useAddItem();

  const {
    mutateAsync: clearDatabase,
  } = useClearDatabase();

  return (
    <Box mx="auto" my={4} p={2} maxWidth="70ch">
      <Stack gap={2}>
        <Box component="form" onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const text = formData.get('text') as string;
          const itemTimestamp = new Date();
          await addItem([{ text }, itemTimestamp]);
        }}>
          <TextField
            name="text"
            defaultValue=""
            label="What do you want to remember?"
            fullWidth
          />

          <Button type="submit">
            Save for later
          </Button>

          <Button color="error" onClick={async () => {
            await clearDatabase();
          }}>
            Clear database
          </Button>
        </Box>

        <Divider />

        <Box>
          <StoreItemListView />
        </Box>
      </Stack>
    </Box>
  );
};
