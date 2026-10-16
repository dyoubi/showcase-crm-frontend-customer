import { FC, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FormattedMessage } from 'react-intl';
import { useTheme } from 'styled-components';

import { useAppCookies } from '@/core/hooks/useAppCookies';
import { useAppDispatch } from '@/core/store/store';
import { IconPlay } from '@/core/shared/Icons';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { setLoginRegisterModalActiveTab, toggleLoginRegisterModal } from '@/core/store/metaSlice';
import { DATA_TEST_IDS } from '@/core/constants/constants';
import { ButtonSize } from '@/core/shared/Button/Button.types';

import { LoginModalTab } from '@/features/Auth/components/LoginModal/LoginModal.types';

import { ButtonContainer, StyledButton, StyledIconPlay } from './RunGameButtons.styles';
import { RunGameButtonsProps } from './RunGameButtons.types';

export const RunGameButtons: FC<RunGameButtonsProps> = ({ runGame, gameDetails }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { rebrandingColors } = useTheme();
  const {
    cookies: { activeBalance = 'BTC' },
  } = useAppCookies();

  const { data: session } = useSession();
  const isLogged = useMemo(() => !!session, [session]);

  const initGame = async ({ demo }: { demo: boolean }) => {
    const { locale } = router;

    if (!gameDetails?.key || !locale) {
      return;
    }

    runGame({
      game: gameDetails?.key,
      balance: activeBalance,
      locale,
      clientType: 'desktop',
      demo,
    } as const);
  };

  const openRegisterModal = useCallback(() => {
    dispatch(toggleLoginRegisterModal());
    dispatch(setLoginRegisterModalActiveTab(LoginModalTab.Register));
  }, [dispatch]);

  return (
    <ButtonContainer>
      {isLogged && (
        <StyledButton
          data-testid={DATA_TEST_IDS.RUN_REAL_PLAY_BUTTON}
          iconLeft={<StyledIconPlay />}
          onClick={() => initGame({ demo: false })}
          size={ButtonSize.Block}
        >
          <FormattedMessage id="game.realPlay" defaultMessage="Real Play" />
        </StyledButton>
      )}
      {!isLogged && (
        <StyledButton iconLeft={<StyledIconPlay />} onClick={openRegisterModal} size={ButtonSize.Block}>
          <FormattedMessage id="topBar.register" defaultMessage="Register" />
        </StyledButton>
      )}
      <StyledButton
        iconLeft={<IconPlay color={rebrandingColors.palette.gray[20]} />}
        onClick={() => initGame({ demo: true })}
        data-testid={DATA_TEST_IDS.RUN_FUN_PLAY_BUTTON}
        size={ButtonSize.Block}
      >
        <FormattedMessage id="game.funPlay" defaultMessage="Fun Play" />
      </StyledButton>
    </ButtonContainer>
  );
};
