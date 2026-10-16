import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { Button } from '@/core/shared/Button';

import { LateralMenu } from '.';

export default {
  argTypes: {
    isOpen: {
      table: {
        disable: true,
      },
    },
    setIsOpen: {
      table: {
        disable: true,
      },
    },
  },
  component: LateralMenu,
  title: 'Partials / Lateral Menu',
};

export const Default: Story<{ children: string }> = ({ ...args }) => {
  const { isTabletOrPhone } = useBreakpoints();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <>
      {isTabletOrPhone && <Button onClick={openModal}>Open menu</Button>}
      <LateralMenu setIsOpen={setIsOpen} />
    </>
  );
};
