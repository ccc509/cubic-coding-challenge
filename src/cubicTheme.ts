import { createTheme } from '@mui/material';

export const palette = {
  white: '#FFFFFE',
  silver: '#C0C0C0',
  grey: '#808080',
  black: '#000000',
  darkRed: '#990101',
  orange: '#EC994B',
  olive: '#808000',
  lime: '#00FF00',
  green: '#1CB01C',
  darkGreen: '#004643',
  aqua: '#8BD3DD',
  teal: '#008080',
  blue: '#0000FF',
  lightblue: '#A8D0E6',
  navy: '#24305E',
  purple: '#374785',
  coral: '#F76C6C',
  pink: '#F582AE',
  lightPink: '#EEBBC3',
  yellow: '#F9BC60',
  lightYellow: '#FEF6E4',
  red: '#EF4565',
  deepBlue: '#232946',
  turquoise: '#0DAAB7',
  lightPurple: '#B8C1EC',
  neonGreen: '#24E500',
  darkGray: '#222224',
  bottomBorder: '#B8C1EC',
};

export const mainTheme = createTheme({
  typography: {
    fontFamily: 'Bricolage Grotesk',
  },
  palette: {
    primary: {
      light: palette.orange,
      main: palette.orange,
      dark: palette.orange,
      contrastText: palette.white,
    },
    secondary: {
      light: palette.lightPurple,
      main: palette.lightPurple,
      dark: palette.lightPurple,
      contrastText: palette.white,
    },
  },
});
