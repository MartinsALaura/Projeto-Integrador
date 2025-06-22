import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#452c00',
      main: '#452c00',
      dark: '#452c00',
      contrastText: '#F6F2F0',
    },
    secondary: {
      light: '#F6F2F0',
      main: '#F6F2F0',
      dark: '#F6F2F0',
      contrastText: '#452c00',
    },
  },
  colors: {
    green: '#475733',
    light: '#F6F2F0',
    brown: '#452c00',
    black: '#000000',
    status: {
      error: '#d32f2f',
      warning: '#ed6c02',
      info: '#0288d1',
      success: '#2e7d32'
    },
  }
});