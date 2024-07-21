import { observer } from 'mobx-react';
import { useEffect, useState, useCallback } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Toggle } from '@/shared/ui/Toggle';


interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = observer(({ className }: ThemeSwitcherProps) => {
    const { toogleTheme } = useTheme();
    const { rootStore } = useStoreProvider();
    const [isDark, setIsDark] = useState(rootStore.darkTheme);

    const toogleHandler = useCallback((e: boolean) => setIsDark(e), []);

    useEffect(() => {
        if (isDark !== rootStore.darkTheme) {
            toogleTheme((newTheme) => {
                console.log(`Тема сменилась на ${newTheme}`);
                //sentThemeToServer(newTheme) - для возможности передать тему на сервер (для сохранения)
                // получать её можно будет в провайдере withTheme (@/src/app/providers/ThemeProvider)
            });
            rootStore.updateDarkTheme(isDark);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDark])

    return (
        <Toggle
            label="Тёмная тема"
            value={isDark}
            onChange={toogleHandler}
            className={className}
        />
    );
});
