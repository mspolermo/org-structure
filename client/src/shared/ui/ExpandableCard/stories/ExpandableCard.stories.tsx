import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { ExpandableCard, ExpandableCardProps } from '../ui/ExpandableCard';


const meta = {
    title: 'Components/ExpandableCard',
    component: ExpandableCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<ExpandableCardProps>;

export default meta;

const ExampleShortView = () => (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>Short View Content</div>
);

const ExampleExpandableView = () => (
    <div style={{ padding: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>Expandable View Content</div>
);

const Template = (args: ExpandableCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ExpandableCard
            {...args}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        />
    );
};

export const Primary = Template.bind({});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Primary.args = {
    shortView: <ExampleShortView />, 
    expandableView: <ExampleExpandableView />,
    isOpen: false,
    withBorder: true,
};
