import { Bet } from '../transaction';
import { BetResponse } from './types';

export const convertBetResponseToBet = (betResponse?: BetResponse): Bet | undefined => {
  if (!betResponse) {
    return undefined;
  }

  return {
    machine: {
      id: betResponse.machine.id,
      slug: betResponse.machine.key,
      title: betResponse.machine.title,
      activate: true,
      casinoId: '',
      createdBy: '',
      created: '',
      description: '',
      machineId: '',
      thumbnailURL: '',
      updated: '',
      updatedBy: '',
    },
    username: betResponse.player.nickname,
    coin: betResponse.action.coin,
    eventId: betResponse.action.data.id,
    date: betResponse.action.timestamp,
    payout: betResponse.action.payout,
    multiplier: betResponse.action.multiplier,
    bet: betResponse.action.amount,
    win: betResponse.action.payout,
  };
};
