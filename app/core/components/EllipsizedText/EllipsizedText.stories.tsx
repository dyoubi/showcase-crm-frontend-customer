import { StoryFn as Story } from '@storybook/react';

import { EllipsizedText } from './EllipsizedText';
import { EllipsizedTextProps } from './EllipsizedText.types';

export default {
  component: EllipsizedText,
  title: 'Components / EllipsizedText',
};

export const Default: Story<EllipsizedTextProps> = ({ ...args }) => (
  <span
    style={{
      resize: 'horizontal',
      overflow: 'auto',
      display: 'inline-block',
    }}
  >
    <EllipsizedText {...args} />
  </span>
);
Default.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra pretium arcu, sit amet sollicitudin lectus pellentesque vitae.',
  maxLength: 30,
};
