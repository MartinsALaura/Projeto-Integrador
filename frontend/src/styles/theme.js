import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    brown: {
      light: '#452c00',
      main: '#452c00',
      dark: '#452c00',
      contrastText: '#F6F2F0',
    },
    light: {
      light: '#F6F2F0',
      main: '#F6F2F0',
      dark: '#F6F2F0',
      contrastText: '#452c00',
    },
    green: {
      light: '#475733',
      main: '#475733',
      dark: '#475733',
      contrastText: '#F6F2F0',
    },
    grey: {
      light: '#E8E4E2',
      main: '#E8E4E2',
      dark: '#E8E4E2',
      contrastText: '#452c00',
    },
    primary: {
      main: '#452c00', // Set primary color to brown
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
  },
  components: {
    // Global override for TextField components
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#452c00',
            '&.Mui-focused': {
              color: '#452c00',
            },
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: '#452c00',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#452c00',
            },
          },
        },
      },
    },
    // Global override for all Input components
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#452c00',
            },
          },
        },
      },
    },
  },
});