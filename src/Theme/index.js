import React from 'react';
import defaultTheme from './defaultTheme';

const Theme = React.createContext(defaultTheme);

export const ThemeProvider = Theme.Provider;
export const ThemeConsumer = Theme.Consumer;