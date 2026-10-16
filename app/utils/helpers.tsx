import { ReactNode } from 'react';
import { ServerResponse } from 'http';
import Router from 'next/router';

import { IconBitcoin, IconEthereum, IconTron } from '@/core/shared/Icons';
import { CryptoCodes } from '@/core/domains/currency';

export const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const redirect = (res: ServerResponse | undefined, route: string, statusCode = 307) => {
  if (!isBrowser && res) {
    res.writeHead(statusCode, {
      Location: route,
    });
    res.end();
  } else {
    Router.replace(route);
  }
};

export const isLocaleRTL = (locale: string | undefined) => {
  if (!locale) {
    return false;
  }

  return ['ar', 'arc', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi'].includes(locale.split('-')[0]);
};

export const importLocaleMessages = async (locale: string | undefined) => {
  if (!locale) {
    return false;
  }

  try {
    return (await import(`@/lang/compiled/${locale}.json`)).default;
  } catch (e) {
    return undefined;
  }
};

export const getClientIP = async () => {
  const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');

  if (response.ok) {
    const data = await response.text();

    const respondObject = data
      .trim()
      .split('\n')
      .reduce((obj: { [key: string]: string }, pair: string) => {
        const line = pair.split('=');

        return {
          ...obj,
          [line[0]]: line[1],
        };
      }, {});

    return respondObject.ip;
  }

  return '';
};

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export const getVariant = <T extends string>(obj: Record<T, boolean>) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Object.keys(obj).find((key) => obj[key as T] === true) as T;
