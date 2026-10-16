import { BlockElement } from '@/core/domains/content';

export interface GetPromotionParams {
  casinoId: string;
  locale: string;
  slug: string;
  device: 'mobile' | 'desktop';
}

export interface Promotion {
  active: boolean;
  key: string;
  startDate: string;
  endDate: string;
  name: string;
  titleId: string;
  bodyId: string;
  termsId: string;
  bannerId: string;
  headerId: string;
  thumbnailId: string;
  casinoId: string;
}

export type PromotionItem = {
  banner: {
    contentURL: string;
  };
  body: {
    content: Array<BlockElement>;
  };
  header: {
    contentURL: string;
  };
  key: string;
  terms: {
    content: Array<BlockElement>;
  };
  thumbnail: {
    contentURL: string;
  };
  title: {
    contentText: string;
  };
  startDate?: string;
  endDate?: string;
};

export type GetPromotionsResponse = ReadonlyArray<Promotion>;
export type GetPromotionResponse = PromotionItem;
