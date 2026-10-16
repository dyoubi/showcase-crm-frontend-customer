import { StoryFn as Story } from '@storybook/react';

import { Button } from '../Button/Button';
import { ButtonColor } from '../Button/Button.types';
import { ButtonGroup } from './ButtonGroup';
import { ButtonGroupProps } from './ButtonGroup.types';

export default {
  component: ButtonGroup,
  title: 'Components / ButtonGroup',
};

const Template: Story<ButtonGroupProps> = ({ ...args }) => (
  <ButtonGroup {...args}>
    <Button>Option 1</Button>
    <Button>Option 2</Button>
    <Button>Option 3</Button>
  </ButtonGroup>
);

const SelectedTemplate: Story<ButtonGroupProps> = ({ ...args }) => (
  <ButtonGroup {...args}>
    <Button>Option 1</Button>
    <Button isSelected color={ButtonColor.Tertiary}>
      Option 2
    </Button>
    <Button>Option 3</Button>
  </ButtonGroup>
);

export const Primary = Template.bind({});
Primary.args = {};

export const Selected = SelectedTemplate.bind({});
Selected.args = {};
