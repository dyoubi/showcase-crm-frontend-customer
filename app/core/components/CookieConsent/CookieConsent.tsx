import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import { theme } from '@/themes/main';

import { StyledAcceptButton, StyledCookieConsent, StyledMoreButton } from './CookieConsent.styles';

export const CookieConsent = () => {
  const { formatMessage } = useIntl();
  const { isDesktop, isPhone } = useBreakpoints();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['cookie-consent']);
  const [cookieConsent, setCookieConsent] = useState(true);

  useEffect(() => {
    if (cookies['cookie-consent'] || router.pathname === '/blocked') {
      setCookieConsent(true);
    } else {
      setCookieConsent(false);
    }
  }, [cookies]);

  return !cookieConsent ? (
    <StyledCookieConsent>
      <div>
        <img src={isDesktop ? '/images/cookie_rounded.png' : '/images/cookie_mobile.png'} alt="" />
        <div>
          <h1>
            {formatMessage({
              id: 'cookieConsent.title',
              defaultMessage: 'Cookies and privacy.',
            })}
          </h1>
          <p>
            {formatMessage({
              id: 'cookieConsent.acceptCookiesMessage',
              defaultMessage:
                'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking Accept, you consent to our use of cookies.',
            })}
          </p>
        </div>
        <div className="buttonsSection">
          <StyledMoreButton
            size={ButtonSize.Medium}
            color={ButtonColor.Tertiary}
            onClick={() => {
              router.push('/about/privacy-policy');
            }}
          >
            {formatMessage({
              id: 'cookieConsent.moreInformation',
              defaultMessage: 'More information',
            })}
          </StyledMoreButton>
          <StyledAcceptButton
            customColor={theme.rebrandingColors.gradients.green}
            size={ButtonSize.Medium}
            type="button"
            onClick={() => {
              setCookie('cookie-consent', 'true', { path: '/', maxAge: 31536000 });
            }}
          >
            {formatMessage({
              id: 'cookieConsent.acceptCookies',
              defaultMessage: 'Accept',
            })}
          </StyledAcceptButton>
        </div>
      </div>
    </StyledCookieConsent>
  ) : null;
};
