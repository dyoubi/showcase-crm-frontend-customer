import { itemsPerPage } from '@/core/constants/constants';

import { encodeFilter } from '@/utils/url';

import { casinoApiRequest } from '../api';
import * as t from './types';

// -----------------------------------------------
// GET
// -----------------------------------------------

export const getPlayerDeposits = async (
  props: t.GetPlayerTransactionsRequest,
): Promise<t.GetPlayerTransactionsResponse<t.DepositTransaction>> => {
  const { accessToken, page } = props;

  const filter = {
    limit: itemsPerPage,
    offset: itemsPerPage * (page - 1),
  };

  const url = `/public/player/deposits?filter=${encodeFilter(filter)}`;
  const { data } = await casinoApiRequest.get<t.GetPlayerTransactionsResponse<t.DepositTransaction>>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const getPlayerOtherTransactions = async (
  props: t.GetPlayerTransactionsRequest,
): Promise<t.GetPlayerTransactionsResponse<t.OtherTransactionsTransaction>> => {
  const { accessToken, page } = props;

  const filter = {
    limit: itemsPerPage,
    offset: itemsPerPage * (page - 1),
  };

  const url = `/public/player/other-transactions?filter=${encodeFilter(filter)}`;
  const { data } = await casinoApiRequest.get<t.GetPlayerTransactionsResponse<t.OtherTransactionsTransaction>>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const getPlayerWithdrawals = async (
  props: t.GetPlayerTransactionsRequest,
): Promise<t.GetPlayerTransactionsResponse<t.WithdrawalTransaction>> => {
  const { accessToken, page } = props;

  const filter = {
    limit: itemsPerPage,
    offset: itemsPerPage * (page - 1),
  };

  const url = `/public/player/withdrawals?filter=${encodeFilter(filter)}`;
  const { data } = await casinoApiRequest.get<t.GetPlayerTransactionsResponse<t.WithdrawalTransaction>>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

// -----------------------------------------------
// POST
// -----------------------------------------------

export const postWithdrawRetract = async (props: t.PostWithdrawRejectRequest) => {
  const { accessToken, withdrawalId } = props;

  return casinoApiRequest.post<void>(
    `/public/player/withdrawals/retract`,
    {
      withdrawalId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
