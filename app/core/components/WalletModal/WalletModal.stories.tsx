import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/core/shared/Button';

import { WalletModal } from '.';

export default {
  title: 'Partials / Wallet Modal',
};

const Template: Story = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button onClick={openModal}>Open wallet modal</Button>
      <WalletModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export const Default = Template.bind({});
