import { FormattedMessage } from 'react-intl';

import { routePaths } from '@/core/constants/routes';

export const policiesMenu = [
  {
    path: '/about/privacy-policy',
    id: 'privacy',
    title: <FormattedMessage id="privacy" defaultMessage="Privacy" />,
    pageTitle: {
      id: 'page.privacyPolicy',
      defaultMessage: 'Privacy Policy',
    },
  },
  {
    path: '/about/aml-policy',
    id: 'aml.policy',
    title: <FormattedMessage id="aml.policy" defaultMessage="AML Policy" />,
    pageTitle: {
      id: 'page.amlPolicy',
      defaultMessage: 'AML Policy',
    },
  },
  {
    path: '/about/terms-of-service',
    id: 'termsOfService',
    title: <FormattedMessage id="terms.of.service" defaultMessage="Terms Of Service" />,
    pageTitle: {
      id: 'page.termsOfService',
      defaultMessage: 'Terms of Service',
    },
  },
  {
    path: '/about/responsible-gaming',
    id: 'responsibleGaming',
    title: <FormattedMessage id="responsible.gaming" defaultMessage="Responsible Gaming" />,
    pageTitle: {
      id: 'page.responsibleGaming',
      defaultMessage: 'Responsible Gaming',
    },
  },
  {
    path: '/about/dispute-resolution',
    id: 'disputeResolution',
    title: <FormattedMessage id="dispute.resolution" defaultMessage="Dispute Resolution" />,
    pageTitle: {
      id: 'page.disputeResolution',
      defaultMessage: 'Dispute Resolution',
    },
  },
  {
    path: '/about/fairness',
    id: 'fairnessRng',
    title: <FormattedMessage id="fairness.rng" defaultMessage="Fairness & RNG Testing Methods" />,
    pageTitle: {
      id: 'page.fairnessRng',
      defaultMessage: 'Fairness & RNG Testing Methods',
    },
  },
  // {
  //   path: '/about/offer-agreement',
  //   id: 'offerAgreement',
  //   title: <FormattedMessage id="offer.aggrement" defaultMessage="Offer Agreement" />,
  //   pageTitle: {
  //     id: 'page.offerAgreement',
  //     defaultMessage: 'Offer Agreement',
  //   },
  // },
];

export const getPolicyDetails = (slug: string) => {
  const policy = policiesMenu.find((item) => item.path?.endsWith(`/${slug}`));

  if (!policy) {
    return null;
  }

  return policy;
};

export const notificationsMenu = [
  {
    path: '/notifications',
    title: <FormattedMessage id="notifications" defaultMessage="Notifications" />,
    id: 'notifications',
  },
];

export const transactionMenu = [
  {
    path: routePaths.transactions.deposits,
    title: <FormattedMessage id="deposits" defaultMessage="Deposits" />,
    id: 'deposits',
  },
  {
    path: routePaths.transactions.withdrawals,
    title: <FormattedMessage id="withdrawals" defaultMessage="Withdrawals" />,
    id: 'withdrawals',
  },
  // TODO @BETS: This will be implemented in a different ticket.
  // {
  //   path: routePaths.transactions.bets,
  //   title: <FormattedMessage id="bets" defaultMessage="Bets" />,
  //   id: 'bets',
  // },
  {
    path: routePaths.transactions.other,
    title: <FormattedMessage id="other" defaultMessage="Other" />,
    id: 'other',
  },
];

export const settingsMenu = [
  // {
  //   path: routePaths.settings.general,
  //   title: <FormattedMessage id="general" defaultMessage="General" />,
  //   id: 'general',
  // },
  // {
  //   path: routePaths.settings.security,
  //   title: <FormattedMessage id="security" defaultMessage="Security" />,
  //   id: 'security',
  // },
  {
    path: routePaths.settings.account,
    title: <FormattedMessage id="account" defaultMessage="Account" />,
    id: 'Account',
  },
  // {
  //   path: routePaths.settings.preferences,
  //   title: <FormattedMessage id="preferences" defaultMessage="Preferences" />,
  //   id: 'Preferences',
  // },
];
