import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/core/shared/Button';

import { Modal } from './Modal';

export default {
  title: 'Components / Modal',
};

const Template: Story = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button onClick={openModal}>Open modal</Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} {...args}>
        Lorem ipsum
      </Modal>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  hasCloseButton: true,
  header: 'Header',
};
