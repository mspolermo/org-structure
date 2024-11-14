import type { Preview } from "@storybook/react";
import { StyleDecorator } from "../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "../src/shared/const/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: Theme.LIGHT,
      toolbar: {
        icon: 'circlehollow',
        items: [Theme.LIGHT, Theme.DARK],
        showName: true,
      },
    },
  },
  decorators: [
    StyleDecorator,
    (Story, context) => {
      const theme = context.globals.theme as Theme;
      return ThemeDecorator(theme)(Story);
    },
  ],
};

export default preview;
