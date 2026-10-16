import { apiSlice, wrapSlicePromise } from '@/core/store/apiSlice';

import { todayIsAfter } from '@/utils/date';

import * as api from './api';
import * as t from './types';

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerBonuses: builder.query({
      queryFn: () => wrapSlicePromise(api.getPlayerBonusesAssigned()),
    }),
    claimBonus: builder.mutation({
      queryFn: (payload: t.ClaimBonusPayload) => wrapSlicePromise(api.claimBonus(payload)),
    }),
  }),
});

export const selectLatestBonus = (data?: t.GetPlayerBonusAssignedResponse) =>
  data?.find((assignation) => {
    const bonusAvailableDate = new Date(
      new Date(assignation?.bonus?.createdAt).getTime() || assignation?.bonus?.parameters?.period || 0,
    );

    return todayIsAfter(bonusAvailableDate);
  });

export const { getPlayerBonuses } = extendedApi.endpoints;
export const { useGetPlayerBonusesQuery, useClaimBonusMutation } = extendedApi;
