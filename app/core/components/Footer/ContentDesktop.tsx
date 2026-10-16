import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';

import { routePaths } from '@/core/constants/routes';
import { toggleVIPModal } from '@/core/store/metaSlice';
import { useAppDispatch } from '@/core/store/store';
import { Toggle } from '@/core/shared/Toggle/Toggle';

import { Column, LinkText, StyledHeading } from './Footer.styles';

interface ContentDesktopProps {
  openLiveSupport: () => void;
  isLogged: boolean;
  changeLang: (lang: 'en' | 'fr') => void;
  currentLocale?: string;
}

export const ContentDesktop = ({ openLiveSupport, isLogged, currentLocale, changeLang }: ContentDesktopProps) => {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();

  const changeLangugage = (selectedIndex: number) => {
    if (selectedIndex === 0) {
      changeLang('en');
    } else {
      changeLang('fr');
    }
  };

  return (
    <>
      <Column>
        <StyledHeading size="h4" data-mocked>
          <FormattedMessage id="footer.casino" defaultMessage="Casino" />
        </StyledHeading>
        <Link href={routePaths.casino}>
          <LinkText>
            <FormattedMessage id="footer.games" defaultMessage="Games" />
          </LinkText>
        </Link>
        {isLogged ? (
          <LinkText onClick={() => dispatch(toggleVIPModal())}>
            <FormattedMessage id="footer.vip" defaultMessage="VIP" />
          </LinkText>
        ) : (
          <Link href={currentLocale === 'en' ? routePaths.vip.en : routePaths.vip.fr}>
            <LinkText>
              <FormattedMessage id="footer.vip" defaultMessage="VIP" />
            </LinkText>
          </Link>
        )}
        <Link href={routePaths.promotions}>
          <LinkText>
            <FormattedMessage id="footer.promotions" defaultMessage="Promotions" />
          </LinkText>
        </Link>
      </Column>
      <Column>
        <StyledHeading size="h4" data-mocked>
          <FormattedMessage id="footer.support" defaultMessage="Support" />
        </StyledHeading>
        <a href="https://www.begambleaware.org/" target="_blank" rel="noreferrer">
          <LinkText data-mocked>
            <FormattedMessage id="footer.gambleAware" defaultMessage="Gamble Aware" />
          </LinkText>
        </a>
        <LinkText onClick={openLiveSupport}>
          <FormattedMessage id="footer.liveSupport" defaultMessage="Live Support" />
        </LinkText>
      </Column>
      <Column>
        <StyledHeading size="h4" data-mocked>
          <FormattedMessage id="footer.privacyAndSecurity" defaultMessage="Privacy & Security" />
        </StyledHeading>
        <Link href={routePaths.privacyPolicy}>
          <LinkText>
            <FormattedMessage id="footer.privacy" defaultMessage="Privacy Policy" />
          </LinkText>
        </Link>
        <Link href={routePaths.amlPolicy}>
          <LinkText>
            <FormattedMessage id="footer.aml" defaultMessage="AML Policy" />
          </LinkText>
        </Link>
        <Link href={currentLocale === 'en' ? routePaths.termsOfService.en : routePaths.termsOfService.fr}>
          <LinkText>
            <FormattedMessage id="footer.termsOfService" defaultMessage="Terms of Service" />
          </LinkText>
        </Link>
        {isLogged && (
          <Link href={routePaths.settings.account}>
            <LinkText>
              <FormattedMessage id="footer.selfExclusion" defaultMessage="Self Exclusion" />
            </LinkText>
          </Link>
        )}
        <Link href={routePaths.responsibleGaming}>
          <LinkText>
            <FormattedMessage id="responsible.gaming" defaultMessage="Responsible Gaming" />{' '}
          </LinkText>
        </Link>
        <Link href={currentLocale === 'en' ? routePaths.disputeResolution.en : routePaths.disputeResolution.fr}>
          <LinkText>
            <FormattedMessage id="dispute.resolution" defaultMessage="Dispute Resolution" />{' '}
          </LinkText>
        </Link>
        <Link href={currentLocale === 'en' ? routePaths.fairnessRng.en : routePaths.fairnessRng.fr}>
          <LinkText>
            <FormattedMessage id="fairness.rng" defaultMessage="Fairness & RNG Testing Methods" />{' '}
          </LinkText>
        </Link>
      </Column>
      <Column>
        <StyledHeading size="h4" align="left" data-mocked>
          <FormattedMessage id="footer.language" defaultMessage="Language" />
        </StyledHeading>
        <Toggle
          labels={[
            formatMessage({
              id: 'footer.english',
              defaultMessage: 'English',
            }),
            formatMessage({
              id: 'footer.french',
              defaultMessage: 'French',
            }),
          ]}
          onSelect={changeLangugage}
          activeIndex={currentLocale === 'en' ? 0 : 1}
        />
      </Column>
    </>
  );
};
