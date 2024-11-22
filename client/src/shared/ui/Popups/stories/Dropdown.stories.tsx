import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Dropdown, DropdownItem, DropdownProps } from '../ui/Dropdown/Dropdown';

const items: DropdownItem[] = [
    {
        disabled: false,
        content: (<div>1</div>),
        onClick: () => console.log('1'),
        href: '#',
    },
    {
        disabled: false,
        content: (<div>2</div>),
        onClick: () => console.log('2'),
        href: '#',
    },
    {
        disabled: true,
        content: (<div>3</div>),
        onClick: () => console.log('3'),
        href: '#',
    },
]

const meta = {
    title: 'Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { },
} satisfies Meta<DropdownProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        items: items,
        trigger: (<div>Кнопка</div>),
    },
};
