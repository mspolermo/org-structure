/**
 * Компонент-обертка приложения (функция высшего порядка), для использования логики смены цветовых тем
*/

import React from 'react';

import ThemeProvider from './ThemeProvider';

export const withTheme = (Component: React.ComponentType) => {
    return () => {
        // const { theme: defaultTheme } = getThemeFromServer(); - для возможности получить тему с сервака
        const defaultTheme = undefined;
        return (
            <ThemeProvider initialTheme={defaultTheme}>
                <Component />
            </ThemeProvider>
        );
    };
};
