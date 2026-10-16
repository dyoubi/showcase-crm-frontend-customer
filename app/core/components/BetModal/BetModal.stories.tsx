import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/core/shared/Button';

import { BetModal } from './BetModal';

export default {
  title: 'Components / Bet Modal',
};

const Template: Story = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button onClick={openModal}>Open modal</Button>
      <BetModal isOpen={isOpen} setIsOpen={setIsOpen} {...args} />
    </>
  );
};

export const Default = Template.bind({});
