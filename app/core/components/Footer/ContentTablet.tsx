import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';

import { routePaths } from '@/core/constants/routes';
import { useAppDispatch } from '@/core/store/store';
import { IconChevronDown, IconChevronUp } from '@/core/shared/Icons';
import { toggleVIPModal } from '@/core/store/metaSlice';
import { Toggle } from '@/core/shared/Toggle/Toggle';

import { AccordionVariant } from '../Accordion/Accordion.types';
import { Accordion } from '../Accordion';
import { CollapsibleHeader, Column, ColumnSection, Divider, LinkText, StyledHeading } from './Footer.styles';
import { languageLabels } from './Footer.constants';

interface ContentTabletProps {
  openLiveSupport: () => void;
  isLogged: boolean;
  changeLang: (lang: 'en' | 'fr') => void;
  currentLocale?: string;
}

export const ContentTablet = ({ openLiveSupport, isLogged, currentLocale, changeLang }: ContentTabletProps) => {
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
        <Accordion
          variant={AccordionVariant.Simple}
          renderHeader={({ onClick, isExpanded }) => (
            <CollapsibleHeader onClick={onClick}>
              <StyledHeading size="h4">
                <FormattedMessage id="footer.casino" defaultMessage="Casino" />
              </StyledHeading>
              {isExpanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
            </CollapsibleHeader>
          )}
        >
          <Column>
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
        </Accordion>
        <Accordion
          variant={AccordionVariant.Simple}
          renderHeader={({ onClick, isExpanded }) => (
            <CollapsibleHeader onClick={onClick}>
              <StyledHeading size="h4">
                <FormattedMessage id="footer.support" defaultMessage="Support" />
              </StyledHeading>
              {isExpanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
            </CollapsibleHeader>
          )}
        >
          <Column>
            <a href="https://www.begambleaware.org/" target="_blank" rel="noreferrer">
              <LinkText>
                <FormattedMessage id="footer.gambleAware" defaultMessage="Gamble Aware" />
              </LinkText>
            </a>
            <LinkText onClick={openLiveSupport}>
              <FormattedMessage id="footer.liveSupport" defaultMessage="Live Support" />
            </LinkText>
          </Column>
        </Accordion>
        <Accordion
          variant={AccordionVariant.Simple}
          renderHeader={({ onClick, isExpanded }) => (
            <CollapsibleHeader onClick={onClick}>
              <StyledHeading size="h4">
                <FormattedMessage id="footer.about" defaultMessage="About Us" />
              </StyledHeading>
              {isExpanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
            </CollapsibleHeader>
          )}
        >
          <Column>
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
        </Accordion>
      </Column>
      <Divider />
      <ColumnSection>
        <StyledHeading size="h4" align="left" data-mocked>
          <FormattedMessage id="footer.language" defaultMessage="Language" />
        </StyledHeading>
        <Toggle
          labels={[formatMessage(languageLabels[0]), formatMessage(languageLabels[1])]}
          onSelect={changeLangugage}
          activeIndex={currentLocale === 'en' ? 0 : 1}
        />
      </ColumnSection>
    </>
  );
};
