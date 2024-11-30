import type { Meta, StoryObj } from '@storybook/react';

import { HStack, HStackProps } from '../ui/HStack/HStack';

const meta = {
    title: 'HStack',
    component: HStack,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<HStackProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        gap: '4',
        justify: 'start',
        align: 'center',
        max: false,
        maxHeight: false,
        children: (
            <>
                <div>first</div>
                <div>second</div>
                <div>third</div>
                <div>fourth</div>
            </>
        ),
    },
};
