import { useState } from 'react';

import { Button } from '@/core/shared/Button';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';

import { ToggleContainer } from './Toggle.styles';
import { ToggleProps } from './Toggle.types';

export const Toggle = ({ labels, onSelect, activeIndex = 0 }: ToggleProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(activeIndex);
  const handleSelect = (currentIndex: number) => {
    onSelect(currentIndex);
    setSelectedIndex(currentIndex);
  };

  return (
    <ToggleContainer>
      {labels?.map((label: string, index: number) => (
        <Button
          size={ButtonSize.Small}
          color={ButtonColor.Tertiary}
          // eslint-disable-next-line react/no-array-index-key
          key={`${label}${index}`}
          onClick={() => {
            handleSelect(index);
          }}
          isSelected={selectedIndex === index}
        >
          {label}
        </Button>
      ))}
    </ToggleContainer>
  );
};
