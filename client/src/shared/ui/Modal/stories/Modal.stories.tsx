import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Modal, ModalProps } from '../ui/Modal';


const meta = {
    title: 'Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { },
} satisfies Meta<ModalProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: (<div style={{padding: 100}}>Модальное окно</div>),
        isOpen: true,
        onClose: fn(),
    },
};
