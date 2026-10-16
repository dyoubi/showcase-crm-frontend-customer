import { StoryFn as Story } from '@storybook/react';

import { Tag } from './Tag';
import { TagProps } from './Tag.types';

export default {
  title: 'Components / Tag',
};

const Template: Story<TagProps> = ({ ...args }) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: 'Recommended Games',
};
