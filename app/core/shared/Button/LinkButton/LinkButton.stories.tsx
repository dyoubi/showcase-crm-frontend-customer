import { StoryFn as Story } from '@storybook/react';

import { LinkButtonProps } from './LinkButton.types';
import { ButtonSize } from '../Button.types';

import { LinkButton } from '.';

export default {
  component: LinkButton,
  title: 'Components / LinkButton',
};

const Template: Story<LinkButtonProps & { children: string }> = (args) => <LinkButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Example Link',
  size: ButtonSize.Big,
};
