import { createContext } from 'react';

import { Theme } from '../../const/theme';

/**
 * Контекст для переключения тем приложения (для обращения к темам из любой точки приложения)
 * @param theme - Текущая тема
 * @param setTheme - Функция установки темы
*/

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
