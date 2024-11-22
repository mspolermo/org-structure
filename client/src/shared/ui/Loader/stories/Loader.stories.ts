import type { Meta, StoryObj } from '@storybook/react';

import { Loader, LoaderProps } from '../Loader';

const meta = {
    title: 'Loader',
    component: Loader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<LoaderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
