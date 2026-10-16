import { StoryFn as Story } from '@storybook/react';

import { Thumbnail } from './Thumbnail';
import { ThumbnailProps } from './types';

export default {
  title: 'Components / Thumbnail',
};

const Template: Story<ThumbnailProps & { children: string }> = ({ ...args }) => <Thumbnail {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: {
    desktop: './images/example-thumbnail.png',
    mobile: './images/example-thumbnail.png',
  },
  title: 'VALLEY OF GODS',
};
