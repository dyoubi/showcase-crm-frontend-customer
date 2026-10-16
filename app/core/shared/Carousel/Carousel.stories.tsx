import { StoryFn as Story } from '@storybook/react';

import { IconProvider } from '@/core/shared/Icons';

import { CarouselProps } from './Carousel.types';
import { Logo } from '../../components/Logo/Logo';
import { LogoBox } from '../../components/LogoBox';

import { Carousel } from '.';

const argTypes = {
  headerIcon: {
    table: {
      disable: true,
    },
  },
};

export default {
  argTypes,
  component: Carousel,
  title: 'Components / Carousel',
};

export const Default: Story<CarouselProps> = ({ ...args }) => (
  <Carousel {...args}>
    {Array(10)
      .fill('')
      .map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <LogoBox key={i}>
          <Logo />
        </LogoBox>
      ))}
  </Carousel>
);

Default.args = {
  header: 'Providers',
  headerIcon: <IconProvider />,
  arrows: true,
  centerMode: false,
  slidesToShow: 6,
  slidesToScroll: 6,
};
