import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
