import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ListBox, ListBoxItem, ListBoxProps } from '../ui/ListBox/ListBox';

const items: ListBoxItem<string>[] = [
    {
        disabled: false,
        content: (<div>1</div>),
        value: '1'
    },
    {
        disabled: false,
        content: (<div>2</div>),
        value: '2'
    },
    {
        disabled: true,
        content: (<div>3</div>),
        value: '3'
    },
]

const meta = {
    title: 'ListBox',
    component: ListBox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { },
} satisfies Meta<ListBoxProps<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        items: items,
        value: '2',
        defaultValue: 'Выберите значение',
        onChange: fn(),
    },
};
