export enum PromotionDevice {
  Mobile = 'mobile',
  Desktop = 'desktop',
}

export type PromotionItemType = {
  active: boolean;
  endDate: string;
  key: string;
  id: string;
  name: string;
};
