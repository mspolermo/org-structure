import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import {Btn} from '@packages/shared/src/ui/button/Btn';

export default {
    title: 'shared/Button',
    component: Btn,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Btn>;

const Template: ComponentStory<typeof Btn> = (args) => <Btn {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    text: 'Обычная',
};

export const Yelloow = Template.bind({});
Yelloow.args = {
    text: 'ЖЁЛТАЯ',
    yellow: true
};
