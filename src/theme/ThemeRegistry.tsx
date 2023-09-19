'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import React from 'react';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const darkThemeOptions: ThemeOptions = {
  typography: {
    fontSize: 12,
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
    },
    primary: {
      main: '#002147',
    },
    secondary: {
      main: '#ffdf00',
    },
    success: {
      main: '#39ff14',
    },
    error: {
      main: '#ff2800',
    },
    warning: {
      main: '#ff6700',
    },
    info: {
      main: '#bf00ff',
    },
    text: {
      primary: '#f5f5f5',
    },
  },
};

const lightThemeOptions: ThemeOptions = {
  typography: {
    fontSize: 12,
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
    },
    primary: {
      main: '#002147',
    },
    secondary: {
      main: '#ffdf00',
    },
    success: {
      main: '#39ff14',
    },
    error: {
      main: '#ff2800',
    },
    warning: {
      main: '#ff6700',
    },
    info: {
      main: '#bf00ff',
    },
    text: {
      primary: '#343434',
    },
  },
};

const darkTheme = createTheme(darkThemeOptions);
const lightTheme = createTheme(lightThemeOptions);

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default ThemeRegistry;
