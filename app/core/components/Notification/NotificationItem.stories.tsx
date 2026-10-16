import { ReactElement } from 'react';
import { StoryFn as Story } from '@storybook/react';

import { NotificationItemVariant } from './NotificationItem.types';

import { NotificationItem, NotificationItemProps } from '.';

const argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  icon: {
    table: {
      disable: true,
    },
  },
  onClose: {
    table: {
      disable: true,
    },
  },
  renderNavItems: {
    table: {
      disable: true,
    },
  },
  variant: {
    control: {
      labels: {
        undefined: 'None',
      },
      type: 'radio',
    },
    options: NotificationItemVariant,
  },
};

export default {
  argTypes,
  component: Notification,
  title: 'Components / NotificationItem',
};

export const Default: Story<
  NotificationItemProps & {
    children: ReactElement;
  }
> = ({ ...args }) => <NotificationItem {...args} />;
Default.args = {
  children: (
    <>
      Something longer to test the line height and letter tracking guide height and letter tracking guide height and
      letter tracking guide {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#">click here</a>
    </>
  ),
  header: 'Header',
  variant: NotificationItemVariant.Default,
};
