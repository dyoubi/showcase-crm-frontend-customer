import { useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useIntercom } from 'react-use-intercom';

import { ECryptoCodes, EFiatCodes, useGetCryptoToFiatConversion } from '@/core/domains/currency';
import { useAppCookies } from '@/core/hooks/useAppCookies';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { GetArticleSliceParams, useGetArticleQuery } from '@/core/domains/article';
import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { routePaths } from '@/core/constants/routes';

import {
  Contact,
  ContactItem,
  Credits,
  Divider,
  FooterContainer,
  FooterLinks,
  FooterLogos,
  FooterText,
  FooterWrapper,
  License,
  Row,
} from './Footer.styles';
import { Bitcoin, Ethereum, LegalAge, ResponsibleGambling, Tron } from './FooterLogos';
import { ContentDesktop } from './ContentDesktop';
import { ContentTablet } from './ContentTablet';
import { CREDITS_ARTICLE_SLUG } from './Footer.constants';
import { RichText } from '../RichText';

export const Footer = () => {
  const {
    cookies: { activeFiatCurrency = EFiatCodes.EUR, activeBalance = ECryptoCodes.BTC },
  } = useAppCookies();
  const { isTabletOrPhone } = useBreakpoints();
  const { formatPrice } = useDisplayPrice();
  const router = useRouter();
  const { show } = useIntercom();
  const isLogged = useIsLogged();
  const convertCryptoToFiat = useGetCryptoToFiatConversion();

  const { pathname, asPath, locale: currentLocale, query } = router;

  const changeLang = useCallback(
    (locale: 'en' | 'fr') =>
      router.push(
        {
          pathname,
          query,
        },
        asPath,
        { locale },
      ),
    [asPath, pathname, query, router],
  );

  const contentProps = {
    openLiveSupport: () => show(),
    isLogged,
    currentLocale,
    changeLang,
  } as const;

  const currentPrice = convertCryptoToFiat({
    amount: 1,
    cryptoCode: activeBalance,
    fiatCode: activeFiatCurrency,
  });

  const { data } = useGetArticleQuery({
    articleKey: CREDITS_ARTICLE_SLUG,
    locale: currentLocale as GetArticleSliceParams['locale'],
  });

  useEffect(() => {
    // More robust initialization that retries if the script isn't loaded yet
    const initLicense = () => {
      if (typeof window !== 'undefined' && window.anj_f9ae909e_099b_44e5_8486_4e06f6253d9c) {
        window.anj_f9ae909e_099b_44e5_8486_4e06f6253d9c.init();
      } else {
        // Retry after a short delay if the script hasn't loaded yet
        setTimeout(initLicense, 500);
      }
    };

    initLicense();

    // Also initialize on window load to be safe
    if (typeof window !== 'undefined') {
      window.addEventListener('load', initLicense);

      return () => window.removeEventListener('load', initLicense);
    }

    return undefined;
  }, []);

  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterLinks>
          {isTabletOrPhone ? <ContentTablet {...contentProps} /> : <ContentDesktop {...contentProps} />}
        </FooterLinks>

        <Divider />

        <FooterLogos>
          <Row>
            <Bitcoin />
            <Ethereum />
            <Tron />
          </Row>

          <Row>
            <Link href={routePaths.responsibleGaming}>
              <ResponsibleGambling />
            </Link>

            <Link href={routePaths.responsibleGaming}>
              <LegalAge />
            </Link>
            <License>
              <div
                id="anj-f9ae909e-099b-44e5-8486-4e06f6253d9c"
                data-anj-seal-id="f9ae909e-099b-44e5-8486-4e06f6253d9c"
                data-anj-image-size="128"
                data-anj-image-type="basic-small"
              />
            </License>
          </Row>
        </FooterLogos>

        <Divider />

        <Credits>
          <FooterText level="small" isBold>
            <FormattedMessage
              id="footer.copyright"
              defaultMessage="© {currentYear} Bitplay.com | All Rights Reserved."
              values={{ currentYear: new Date().getFullYear() }}
            />
          </FooterText>

          <FooterText level="small" align="center">
            {currentPrice && (
              <span>
                1 {activeBalance} ={' '}
                {formatPrice({ amount: currentPrice, currency: activeFiatCurrency, locale: currentLocale })}
              </span>
            )}
          </FooterText>

          <FooterText level="small">
            <RichText data={data?.body?.content} />
          </FooterText>
        </Credits>

        <Contact>
          <ContactItem>
            <Link href="mailto:support@bitplay.com">
              <FormattedMessage id="footer.support" defaultMessage="Support" />: support@bitplay.com
            </Link>
          </ContactItem>
        </Contact>
      </FooterWrapper>
    </FooterContainer>
  );
};
