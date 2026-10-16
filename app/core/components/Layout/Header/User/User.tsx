import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useIntercom } from 'react-use-intercom';

import { routePaths } from '@/core/constants/routes';
import { Button } from '@/core/shared/Button';
import { LoginStatesValues } from '@/core/constants/constants';
import { logout } from '@/core/domains/player';
import { useMediaContext } from '@/core/hooks/useMediaContext';

import { LoadingContainer, UserStatusTest, Wrapper } from './User.styles';

export const User = () => {
  const { data: session, status } = useSession();
  const isLoading = status === LoginStatesValues.LOADING;

  const { device } = useMediaContext();
  const { trackEvent } = useIntercom();

  return (
    <Wrapper>
      <LoadingContainer isLoading={isLoading}>
        {session ? (
          <>
            <UserStatusTest>
              <small>Signed in</small>
              <br />
              <strong>{session?.player?.email || session?.player?.nickname || ''}</strong>
            </UserStatusTest>
            <p>
              <Button type="button" className="button" onClick={() => logout(trackEvent, device)}>
                Sign out
              </Button>
            </p>
          </>
        ) : (
          <>
            <UserStatusTest>You are not signed in</UserStatusTest>
            <p>
              <Link href={routePaths.login} passHref>
                <Button as="a" className="buttonPrimary">
                  Sign in
                </Button>
              </Link>
            </p>
          </>
        )}
      </LoadingContainer>
    </Wrapper>
  );
};
