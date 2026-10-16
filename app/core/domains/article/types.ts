import { ContentRichText, ContentText } from '@/core/domains/content';

export interface GetArticleResponse {
  id: string;
  key: BuildInArticlesSlugs | string;
  casinoId: string;
  title?: ContentText;
  body?: ContentRichText;
}

export enum BuildInArticlesSlugs {
  PRIVACY_POLICY = 'privacy-policy',
  AML_POLICY = 'aml-policy',
  TERM_OF_SERVICE = 'terms-of-service',
  DISPUTE_RESOLUTION = 'dispute-resolution',
  FAIRNESS_RNG = 'fairness',
  RESPONSIBLE_GAMING = 'responsible-gaming',
  // OFFER_AGREEMENT = 'offer-agreement',
}

export enum PoliciesArticlesSlugs {
  PRIVACY_POLICY = BuildInArticlesSlugs.PRIVACY_POLICY,
  AML_POLICY = BuildInArticlesSlugs.AML_POLICY,
  TERM_OF_SERVICE = BuildInArticlesSlugs.TERM_OF_SERVICE,
  DISPUTE_RESOLUTION = BuildInArticlesSlugs.DISPUTE_RESOLUTION,
  FAIRNESS_RNG = BuildInArticlesSlugs.FAIRNESS_RNG,
  RESPONSIBLE_GAMING = BuildInArticlesSlugs.RESPONSIBLE_GAMING,
  // OFFER_AGREEMENT = BuildInArticlesSlugs.OFFER_AGREEMENT,
}
