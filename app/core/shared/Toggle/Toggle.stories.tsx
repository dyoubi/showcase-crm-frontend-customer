import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';

import { Toggle } from './Toggle';
import { ToggleProps } from './Toggle.types';

export default {
  title: 'Components / Toggle',
  component: Toggle,
  argTypes: {
    labels: {
      control: 'array',
      description: 'Array of labels for the toggle buttons',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback function when a toggle is selected',
    },
    activeIndex: {
      control: 'number',
      description: 'Index of the initially active button',
    },
  },
};

const RenderContent = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <div style={{ color: 'blue' }}>`You selected Option 1</div>;
    case 1:
      return <div style={{ color: 'green' }}>You selected Option 2</div>;
    case 2:
      return <div style={{ color: 'red' }}>You selected Option 3</div>;
    default:
      return null;
  }
};

const TemplateWithDynamicContent: Story<{ labels: Array<string>; activeIndex: number }> = ({ labels, activeIndex }) => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(activeIndex);

  const handleSelect = (index: number) => {
    setCurrentActiveIndex(index);
  };

  return (
    <div>
      <Toggle labels={labels} onSelect={handleSelect} activeIndex={currentActiveIndex} />
      <RenderContent index={currentActiveIndex} />
    </div>
  );
};

export const DynamicContent = TemplateWithDynamicContent.bind({});
DynamicContent.args = {
  labels: ['Option 1', 'Option 2', 'Option 3'],
  activeIndex: 0,
};
