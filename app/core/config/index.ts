import getConfig from 'next/config';

import { Config } from './types';

const {
  nextPublicEnv,
  nodeEnv,
  publicBackendUrl,
  internalBackendUrl,
  operatorApiKey,
  publicMachineScriptUrl,
  casinoId,
  casinoKey,
  coinsUrl,
} = getConfig()?.publicRuntimeConfig || {};

const isServerSide = typeof window === 'undefined';

export const config: Config = {
  // when the render is made on server side,
  // we must use a private address for fetch datas
  // and skip cloudfare's firewall
  publicBackendUrl: isServerSide && internalBackendUrl ? internalBackendUrl : publicBackendUrl,

  operatorApiKey,
  publicMachineScriptUrl,
  nextPublicEnv,
  nodeEnv,
  isServerSide,
  casinoId,
  casinoKey,
  coinsUrl,
} as const;
