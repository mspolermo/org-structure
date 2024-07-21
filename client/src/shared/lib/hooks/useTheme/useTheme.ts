import { useContext } from 'react';

import { Theme } from '../../../const/theme';
import { ThemeContext } from '../../context/ThemeContext';

/**
 * Логика по переключению темы приложения
 * @param theme - Текущая тема
 * @param toogleTheme - Функция переключения темы
*/

interface UseThemeResult {
    toogleTheme: (saveAction?: (theme: Theme) => void) => void;
    theme: Theme;
}

// Возможно добавлять новые темы и использовать больше чем 2 темы

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toogleTheme = (saveAction?: (theme: Theme) => void) => {
        let newTheme: Theme;
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.DARK;
            break;
        default:
            newTheme = Theme.LIGHT;
        }
        setTheme?.(newTheme);
        saveAction?.(newTheme);
    };

    return { theme: theme || Theme.LIGHT, toogleTheme };
}
