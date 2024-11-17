import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Card, CardProps } from '../Card';


const meta = {
    title: 'Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'normal',
        padding: '24',
        children: 'Карточка с текстом'
    },
};
