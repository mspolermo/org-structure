import type { Meta, StoryObj } from '@storybook/react';

import { FlexProps } from '../types/stack';
import { Flex } from '../ui/Flex/Flex';

const meta = {
    title: 'Flex',
    component: Flex,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<FlexProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        gap: '4',
        justify: 'start',
        align: 'center',
        max: false,
        maxHeight: false,
        direction: 'row',
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