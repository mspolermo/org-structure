import type { Meta, StoryObj } from '@storybook/react';

import { VStack, VStackProps } from '../ui/VStack/VStack';

const meta = {
    title: 'VStack',
    component: VStack,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<VStackProps>;

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