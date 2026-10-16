import { StoryFn as Story } from '@storybook/react';

import { Card } from '@/core/shared/Card';
import { Subheadline } from '@/core/components/Typography';

import { CardProps } from './Card.types';

const argTypes = {
  backgroundColor: '#FF8800',
};

export default {
  argTypes,
  component: Card,
  title: 'Components / Card',
};

export const Default: Story<CardProps> = ({ ...args }) => <Card {...args} />;

Default.args = {
  children: (
    <>
      <Subheadline>Card Component Header</Subheadline>

      <p>
        Something longer to test the line height and letter tracking guide height and letter tracking guide height and
        letter tracking guide {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      </p>
    </>
  ),
};
