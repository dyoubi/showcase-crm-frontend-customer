import { StoryFn as Story } from '@storybook/react';

import { Pagination } from './Pagination';
import { PaginationProps } from './Pagination.types';

const Template: Story<PaginationProps> = ({ ...args }) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataLength: 100,
};

export default {
  component: Pagination,
  title: 'Components / Pagination',
};
