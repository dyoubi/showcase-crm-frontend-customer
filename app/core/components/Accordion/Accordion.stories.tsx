import { StoryFn as Story } from '@storybook/react';

import { IconSatoshiEnthusiast } from '@/core/shared/Icons';

import { AccordionProps, AccordionVariant } from './Accordion.types';
import { Text } from '../Typography';
import { Button } from '../../shared/Button';
import { Accordion } from './Accordion';

const argTypes = {
  iconLeft: {
    control: {
      disable: true,
    },
  },
  isOpenByDefault: {
    control: 'boolean',
  },
  title: {
    control: 'text',
  },
  variant: {
    control: {
      labels: {
        undefined: 'None',
      },
      type: 'radio',
    },
    options: AccordionVariant,
  },
};

export default {
  argTypes,
  component: Accordion,
  title: 'Components / Accordion',
};

export const Default: Story<AccordionProps> = ({ ...args }) => <Accordion {...args}>Lorem ipsum dolor mit</Accordion>;

Default.args = {
  title: 'Accordion',
  iconLeft: <IconSatoshiEnthusiast />,
  variant: AccordionVariant.Default,
};

export const ComponentAsHeader: Story<AccordionProps> = ({ ...args }) => (
  <Accordion
    {...args}
    renderHeader={({ onClick, isExpanded }) => (
      <Button onClick={onClick}>
        <Text level="medium">{isExpanded ? 'Close' : 'Open'}</Text>
      </Button>
    )}
  >
    Lorem ipsum dolor mit
  </Accordion>
);
