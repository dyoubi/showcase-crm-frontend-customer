export interface ChangellyDepositForm {
  providerCode: string;
  currencyFrom: 'USD' | 'EUR';
  currencyTo: 'BTC' | 'ETH' | 'TRX';
  amountFrom: string;
  termsAccepted?: boolean; // Optional since auto-accepted
}
