import { useState } from 'react';

import { DATA_TEST_IDS } from '@/core/constants/constants';
import { ButtonColor, ButtonSize, ButtonVariant } from '@/core/shared/Button/Button.types';
import { Button } from '@/core/shared';

import { ButtonContainer, Content, Description } from './GameDescription.styles';
import { GameDescriptionProps } from './GameDescription.types';
import { gameDescriptionMenu } from './GameDescriptionMenuList';

export const GameDescription = ({ description }: GameDescriptionProps) => {
  const [activeMenu, setActiveMenu] = useState('description');

  return (
    <Content>
      <ButtonContainer>
        {gameDescriptionMenu.map((menuItem) => (
          <Button
            key={menuItem.id}
            color={ButtonColor.Tertiary}
            size={ButtonSize.Small}
            variant={menuItem.id === activeMenu ? ButtonVariant.Outlined : ButtonVariant.Filled}
            onClick={() => {
              setActiveMenu(menuItem.id);
            }}
          >
            {menuItem.title}
          </Button>
        ))}
      </ButtonContainer>
      <Description data-testid={DATA_TEST_IDS.GAME_DETAILS_DESCRIPTION} level="small">
        {activeMenu === 'description' && description}
      </Description>
    </Content>
  );
};
