import { StoryFn as Story } from '@storybook/react';

import { PromotionBox } from './PromotionBox';
import { PromotionBoxProps } from './PromotionBox.types';

const Template: Story<PromotionBoxProps> = ({ ...args }) => <PromotionBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  src: '/images/example-promo.png',
};

export default {
  component: PromotionBox,
  title: 'Components / PromotionBox',
};
