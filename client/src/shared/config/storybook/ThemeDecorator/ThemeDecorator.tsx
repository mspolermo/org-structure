import type { StoryFn } from '@storybook/react'; 
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
import '@/app/styles/index.scss';

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn) => {

    return (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <Story />
            </div>
        </ThemeProvider>
    );
};
