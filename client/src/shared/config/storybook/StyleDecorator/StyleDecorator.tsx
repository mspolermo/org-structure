import type { StoryFn } from '@storybook/react'; 
import '@/app/styles/index.scss';

// Декоратор
export const StyleDecorator = (Story: StoryFn) => (
  <div>
    <Story />
  </div>
);
