import { StoryFn as Story } from '@storybook/react';

import { FeedbackMessageProps, FieldVariant } from './FeedbackMessage.types';

import { FeedbackMessage } from '.';

const argTypes = {
  variant: {
    control: {
      labels: {
        undefined: 'None',
      },
      type: 'radio',
    },
    options: FieldVariant,
  },
};

export default {
  argTypes,
  component: FeedbackMessage,
  title: 'Components / FeedbackMessage',
};

export const Default: Story<
  FeedbackMessageProps & {
    children: string;
  }
> = ({ ...args }) => <FeedbackMessage {...args} />;
Default.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  variant: FieldVariant.Default,
};
