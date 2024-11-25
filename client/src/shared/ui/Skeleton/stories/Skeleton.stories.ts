import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton, SkeletonProps } from '../Skeleton';

const meta = {
    title: 'Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<SkeletonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        height: 100,
        width: 700
    },
};
