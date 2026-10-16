export type DepositAddress = {
  provider: string;
  address: string;
};

export type DepositAddresses = {
  [coin: string]: ReadonlyArray<DepositAddress>;
};

export type WalletState = {
  addresses: DepositAddresses;
};

export type FinanceWithdrawMethodType = 'crypto' | 'credit-card';

export type FinanceWithdrawMethod = {
  type: FinanceWithdrawMethodType;
  address: string;
};

export type WithdrawRequest = {
  currency: string;
  amount: string;
  info: FinanceWithdrawMethod;
};

// Ported from finance
export enum EFeeType {
  PERCENTAGE = 'percentage',
  CONSTANT = 'constant',
}

export type FeeType = `${EFeeType}`;

export type FeeOptions = {
  type: FeeType;
  value: number;
};

export type EstimatedFees = PspProviderMinimumAmount & {
  feeSettings: FeeOptions;
};

export type PspProviderMinimumAmount = {
  minDeposit: string;
  minWithdrawal: string;
  currency: string;
};

// export type GetEstimateFees = EstimatedFees;

export type ChangellyDepositRequest = {
  ownerId: string;
  providerCode: string;
  currencyFrom: string;
  currencyTo: string;
  amountFrom: string;
  country: string;
  walletAddress: string;
  baseURL: string;
};

export type ChangellyDepositSuccessResponse = {
  redirectUrl: string;
  returnFailedUrl: string | null;
  returnSuccessUrl: string | null;
  orderId: string;
  externalUserId: string;
  externalOrderId: string;
  providerCode: string;
  type: 'buy';
  currencyFrom: 'USD' | 'EUR';
  currencyTo: 'BTC' | 'ETH' | 'TRX';
  amountFrom: string;
  country: string;
  state: string | null;
  ip: string | null;
  walletAddress: string;
  walletExtraId: string | null;
  refundAddress: string | null;
  paymentMethod: 'card';
  userAgent: string | null;
  metadata: {
    foreignId: string;
  };
  createdAt: string;
};

export type ChangellyDepositOffersRequest = {
  providerCode?: string;
  currencyFrom: string;
  currencyTo: string;
  amountFrom: string;
  country: string;
  state?: string;
  ip?: string;
};

export type ChangellyDepositOffer = {
  offerId: string;
  amountExpectedTo: string;
  method: string;
  methodName: string;
  rate: string;
  invertedRate: string;
  fee: string;
};

export type ChangellyDepositOffersResponse = {
  providerCode: string;
  offerId: string;
  rate: string;
  invertedRate: string;
  fee: string;
  amountFrom: string;
  amountExpectedTo: string;
  paymentMethodOffer: Array<ChangellyDepositOffer>;
  additionalData?: { [key: string]: any };
  errorType?: 'limits' | 'other';
  errorMessage?: string;
};
