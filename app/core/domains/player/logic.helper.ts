import Cookies from 'js-cookie';
import { getSession, signOut } from 'next-auth/react';

import { ACTIVE_BALANCE, ACTIVE_FIAT_CURRENCY, DISPLAY_IN_FIAT } from '@/core/constants/cookies';

import { getPlayerBalances } from '../balance/api';

import { Device } from '@/libs/media-query';

export const getPlayerEventData = async (device: Device) => {
  try {
    const s = await getSession();
    const { player } = s || {};

    const { nickname, status, stats, userId } = player || {};

    const eventData: { [key: string]: any } = {
      user_id: userId,
      username: nickname,
      player_status: status,
      vip_level: stats?.rankLevel,
      timestamp: new Date().toISOString(),
      device,
    };

    try {
      if (status === 'activated') {
        const balances = await getPlayerBalances();

        if (balances?.length) {
          balances.reduce((acc, { coin, value, precision }) => {
            acc[`balance_${coin}`] = (Number(value) || 0) / 10 ** (Number(precision) || 0);

            return acc;
          }, eventData);
        }
      }
    } catch (error) {
      console.error('Error fetching player balances:', error);
    }

    return { eventData, player };
  } catch (error) {
    console.error('Error fetching player event data:', error);

    return { eventData: {}, player: undefined };
  }
};

export const logout = async (trackEvent: (event: string, metaData?: object) => void, device: Device) => {
  const { eventData } = await getPlayerEventData(device);

  trackEvent('user_logout', eventData);

  // Clear cookies before sign out
  Cookies.remove(ACTIVE_BALANCE);
  Cookies.remove(ACTIVE_FIAT_CURRENCY);
  Cookies.remove(DISPLAY_IN_FIAT);

  // Sign out and wait for the session to be cleared on the backend
  // Using redirect: false to prevent navigation, then manually redirect after session is confirmed cleared
  await signOut({ redirect: false });

  // Force a session refresh to ensure the backend has cleared the session
  const clearedSession = await getSession();

  // Only redirect if the session is actually cleared
  if (!clearedSession) {
    // If session is cleared, redirect to home page
    window.location.href = '/';
  } else {
    // If session still exists (shouldn't happen in normal flow), wait a bit and try again
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 500);
    });
    window.location.href = '/';
  }
};
