export const routePaths = {
  error: '/404',
  home: '/',
  login: '/login',
  protected: '/protected',
  server: '/server',
  static: '/static',
  subpage: '/subpage',
  category: '/category',
  game: '/game',
  casino: '/casino',
  profile: '/profile',
  promotions: '/promotions',
  privacyPolicy: '/about/privacy-policy',
  amlPolicy: '/about/aml-policy',
  responsibleGaming: '/about/responsible-gaming',
  disputeResolution: {
    en: '/about/dispute-resolution',
    fr: '/fr/about/dispute-resolution',
  },
  fairnessRng: {
    en: '/about/fairness',
    fr: '/fr/about/fairness',
  },
  termsOfService: {
    en: '/about/terms-of-service',
    fr: '/fr/about/terms-of-service',
  },
  favorite: '/favorites',
  blocked: '/blocked',
  providers: '/providers',
  // offerAgreement: {
  //   en: '/about/offer-agreement',
  //   fr: '/fr/about/offer-agreement',
  // },
  settings: {
    account: '/settings/account',
    general: '/settings/general',
    security: '/settings/security',
    // preferences: '/settings/preferences',
  },
  transactions: {
    deposits: '/transactions/deposits',
    withdrawals: '/transactions/withdrawals',
    // TODO @BETS: This will be implemented in a different ticket.
    // bets: '/transactions/bets',
    other: '/transactions/other',
  },
  vip: {
    en: '/vip',
    fr: '/fr/vip',
  },
} as const;
