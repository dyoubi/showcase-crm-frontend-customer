import axios from 'axios';
import { NextApiRequest } from 'next';

import { config } from '@/core/config';
import { GetPlayerResponse, Player } from '@/core/domains/player';

import { addSlashIfNotPresent } from '@/utils/url';

import { HeaderSettings, SSRRequestOptions } from '../types';

interface GetAccessTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface GetAuthApiAccessTokenParams {
  email: string;
  password: string;
}

interface GetRegisterUserResponse {
  birthdate: Player['birthdate'];
  email: Player['email'];
  marketingAcceptation: Player['marketingAcceptation'];
  nickname: Player['nickname'];
  userId: Player['userId'];
}

interface RegisterUserAuthApi {
  email: string;
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  birth: string;
  locale: string;
  marketingAcceptation?: boolean;
  metadata: {
    affiliateId?: string;
    affiliateToken?: string;
  };
}

interface ValidateUserAuthApi {
  token?: string;
}

const PUBLIC_BACKEND_URL = addSlashIfNotPresent(config.publicBackendUrl);

export const forwardedHeadersSettings: HeaderSettings = {
  'x-forwarded-for': 'x-ring-forwarded-for',
  'x-real-ip': 'x-ring-real-ip',
  'cf-connecting-ip': 'x-ring-cf-connecting-ip',
  'user-agent': 'x-ring-user-agent',
};

export const remoteHeadersSettings: HeaderSettings = {
  IPv4: 'x-ring-remote-ipv4',
  IPv6: 'x-ring-remote-ipv6',
};

export const extractForwardedHeaders = (req: NextApiRequest, forwardedHeaders: HeaderSettings): HeaderSettings => {
  const headers: HeaderSettings = {};

  Object.entries(forwardedHeaders).forEach(([key, value]) => {
    if (req.headers[key]) {
      headers[value] = req.headers[key] as string;
    }

    if (req.headers[value]) {
      headers[value] = req.headers[value] as string;
    }
  });

  return headers;
};

export const createRemoteIpHeaders = (req: NextApiRequest, remoteHeaders: HeaderSettings): HeaderSettings => {
  const ipHeaders: HeaderSettings = {};

  if (req.socket.remoteFamily === 'IPv6') {
    ipHeaders['x-ring-remote-ipv6'] = req.socket.remoteAddress as string;
  }

  if (req.socket.remoteFamily === 'IPv4') {
    ipHeaders['x-ring-remote-ipv4'] = req.socket.remoteAddress as string;
  }

  return ipHeaders;
};

export const createServerSideRequestHeaders = (req: NextApiRequest): HeaderSettings => {
  const ipHeaders = createRemoteIpHeaders(req, remoteHeadersSettings);
  const forwardedHeaders = extractForwardedHeaders(req, forwardedHeadersSettings);

  return { ...ipHeaders, ...forwardedHeaders };
};

export const getAuthApiAccessToken = async ({ email, password }: GetAuthApiAccessTokenParams) => {
  const res = await axios.post<GetAccessTokenResponse>(
    `${PUBLIC_BACKEND_URL}public/token`,
    {
      grant_type: 'username_password_credentials',
      client_id: process.env.NEXT_AUTH_API_CLIENT_ID,
      client_secret: process.env.NEXT_AUTH_API_CLIENT_SECRET,
      scope: 'openid profile read:casino player read:players',
      email,
      password,
      audience: process.env.NEXT_AUTH_API_AUDIENCE,
    },
    {
      headers: {
        'x-casino-id': config.casinoKey,
      },
    },
  );

  return res.data;
};

export const getPlayerInfos = async (accessToken: string) => {
  const { data } = await axios.get<GetPlayerResponse>(`${addSlashIfNotPresent(config.publicBackendUrl)}public/player`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'x-casino-id': config.casinoKey,
    },
  });

  return data;
};

export const registerUserAuthApi = async (
  payload: RegisterUserAuthApi,
  options: SSRRequestOptions,
): Promise<GetRegisterUserResponse> => {
  const { birth, email, firstname, lastname, locale, marketingAcceptation, metadata, password, username } = payload;

  if (!email || !password || !username) {
    throw new Error('Missing parameters');
  }

  const { data } = await axios.post<GetPlayerResponse>(
    `${PUBLIC_BACKEND_URL}public/registration`,
    {
      birthdate: birth,
      email,
      firstname,
      lastname,
      locale,
      marketingAcceptation,
      metadata,
      password,
      privacyRulesAcceptation: true,
      termsAcceptation: true,
      username,
    },
    {
      headers: {
        ...options.headers,
        'x-casino-id': config.casinoKey,
      },
    },
  );

  return {
    nickname: data.nickname,
    email: data.email,
    birthdate: data.birthdate,
    marketingAcceptation: data.marketingAcceptation,
    userId: data.userId,
  };
};

export const validateUserAuthApi = async (props: ValidateUserAuthApi, options: SSRRequestOptions): Promise<boolean> => {
  const { token } = props;

  if (!token) {
    return false;
  }

  const { data } = await axios.post<{ success: boolean }>(
    `${PUBLIC_BACKEND_URL}public/verify-email`,
    { token },
    {
      headers: {
        ...options.headers,
        'x-casino-id': config.casinoKey,
        Accept: '*/*',
      },
    },
  );

  return data.success;
};
