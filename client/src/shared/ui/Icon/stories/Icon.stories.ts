import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ChevronLeft } from '@/shared/assets/svg-icons/status';

import { Icon, IconProps } from '../Icon';

const meta: Meta<IconProps> = {
    title: 'Icon',
    component: Icon as React.ComponentType<IconProps>,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<IconProps>;

export const Primary: Story = {
    args: {
        Svg: ChevronLeft,
        width: 32,
        height: 32,
        clickable: true,
        borderType: 'soft',
        color: 'normal',
    },
};
