import { StoryFn as Story } from '@storybook/react';

import { Text } from '@/core/components/Typography/Text';
import { IconEarlyAdopter, IconSatoshiEnthusiast } from '@/core/shared/Icons';

import { ProgressBar } from './ProgressBar';
import { ProgressBarProps } from './ProgressBar.types';

const labelStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '8px 0',
  padding: '0 8px',
};

const topLabels = (
  <div style={labelStyles}>
    <Text level="small">Your VIP Progress</Text>
    <Text level="small">31,74%</Text>
  </div>
);
const bottomLabels = (
  <div style={labelStyles}>
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconEarlyAdopter />
      <Text level="small" as="span">
        Bronze
      </Text>
    </span>
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconSatoshiEnthusiast />
      <Text level="small" as="span">
        Silver
      </Text>
    </span>
  </div>
);

export default {
  component: ProgressBar,
  title: 'Components / ProgressBar',
};

const Template: Story<ProgressBarProps> = ({ ...args }) => (
  <div>
    {topLabels}
    <ProgressBar {...args} />
    {bottomLabels}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  progress: 30,
};
