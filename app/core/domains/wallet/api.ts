import { casinoApiRequest } from '../api';
import { ECryptoCodes } from '../currency';
import * as t from './types';

export const getPlayerDepositAddresses = async () => {
  const currencies = Object.values(ECryptoCodes).join(',');
  const { data } = await casinoApiRequest.get<t.DepositAddresses>(`/public/player/addresses?currencies=${currencies}`);

  return data;
};

export const getEstimatedFees = async (currencies: string) => {
  const { data } = await casinoApiRequest.get<t.EstimatedFees>(`/public/cashier/withdrawals?currency=${currencies}`);

  return data;
};

export const postWithdrawRequest = async (requestBody: t.WithdrawRequest) => {
  const { data } = await casinoApiRequest.post<{ [key: string]: any }>('/public/cashier/withdraw', requestBody);

  return data;
};

export const postChanellyDepositRequest = async (
  requestBody: t.ChangellyDepositRequest,
): Promise<t.ChangellyDepositSuccessResponse> => {
  const { data } = await casinoApiRequest.post<t.ChangellyDepositSuccessResponse>(
    '/public/cashier/on-ramp/order',
    requestBody,
  );

  return data;
};

export const postChanellyDepositOffersRequest = async (
  requestBody: t.ChangellyDepositOffersRequest,
): Promise<Array<t.ChangellyDepositOffersResponse>> => {
  const { data } = await casinoApiRequest.get<Array<t.ChangellyDepositOffersResponse>>(
    '/public/cashier/on-ramp/offers',
    {
      params: requestBody,
    },
  );

  return data;
};
