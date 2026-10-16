import { FormattedMessage } from 'react-intl';

import { GameMode, selectGameMode } from '@/core/domains/machineView';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { Checkbox } from '@/core/shared/Checkbox';
import { CheckboxVariant } from '@/core/shared/Checkbox/Checkbox.types';
import { IconFullScreen, IconHome, IconScreen } from '@/core/shared/Icons';
import { useAppSelector } from '@/core/store/store';
import { Tooltip } from '@/core/shared/Tooltip';

import { FavoriteButton } from './FavoriteButton';
import { LeftContainer, RightContainer, StyledButton, StyledFooterBar, StyledText } from './GameFooter.styles';
import { GameFooterProps } from './GameFooter.types';

export const GameFooter = ({
  gameDetails,
  onFullScreenClick,
  onWideScreen,
  onHomeClick,
  onPlaymodeToggle,
}: GameFooterProps) => {
  const gameMode = useAppSelector(selectGameMode);
  const isLogged = useIsLogged();

  return (
    <StyledFooterBar>
      <LeftContainer>
        <Tooltip
          message={<FormattedMessage id="footer.fullScreen" defaultMessage="Full Screen" />}
          position="bottom-start"
        >
          <StyledButton onClick={onFullScreenClick}>
            <IconFullScreen size="m" />
          </StyledButton>
        </Tooltip>
        <Tooltip
          message={<FormattedMessage id="footer.cinemaMode" defaultMessage="Cinema Mode" />}
          position="bottom-start"
        >
          <StyledButton onClick={onWideScreen}>
            <IconScreen size="m" />
          </StyledButton>
        </Tooltip>
        <Tooltip message={<FormattedMessage id="footer.home" defaultMessage="Home" />} position="bottom-start">
          <StyledButton onClick={onHomeClick}>
            <IconHome size="m" color="white" />
          </StyledButton>
        </Tooltip>
        {isLogged && (
          <Tooltip
            message={<FormattedMessage id="footer.favorites" defaultMessage="Favorites" />}
            position="bottom-start"
          >
            <FavoriteButton machineViewId={gameDetails?.id} />
          </Tooltip>
        )}
      </LeftContainer>
      <RightContainer>
        <Checkbox checked={gameMode === GameMode.Real} disabled={!gameMode} onChange={onPlaymodeToggle} />
        <StyledText level="small">
          <FormattedMessage id="game.realPlay" defaultMessage="Real Play" />
        </StyledText>
      </RightContainer>
    </StyledFooterBar>
  );
};
