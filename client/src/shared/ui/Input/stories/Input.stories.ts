import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Input, InputCommonProps } from '../Input';


const meta = {
    title: 'Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<InputCommonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        value: 'Текстовое поле'
    },
};
