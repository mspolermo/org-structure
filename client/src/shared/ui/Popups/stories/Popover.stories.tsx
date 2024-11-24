import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../Button';
import { Popover, PopoverProps } from '../ui/Popover/Popover';

const trigger = (
    <Button
        onClick={() => console.log('')}
    >
        <p>Кнопка</p>
    </Button>
);

const menu = (
    <>
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>fourth</div>
    </>
);

const meta = {
    title: 'Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { },
} satisfies Meta<PopoverProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        trigger,
        children: menu
    },
};
