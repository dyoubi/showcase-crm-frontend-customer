import { isAxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { routePaths } from '@/core/constants/routes';

import { AuthApiErrorEnums, SSRErrorsType } from '../types';
import { getAuthApiAccessToken, getPlayerInfos } from './helper';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error('Email or password is missing');
        }

        try {
          const { access_token, refresh_token, expires_in } = await getAuthApiAccessToken({
            email,
            password,
          });

          const player = await getPlayerInfos(access_token);

          return {
            id: player?.id,
            access: access_token,
            refreshToken: refresh_token,
            expireIn: expires_in,
          };
        } catch (e) {
          if (!isAxiosError(e)) {
            // eslint-disable-next-line no-console
            console.error(e); // TODO use Sentry

            throw new Error('UNKNOW_ERROR');
          }

          if (e?.response?.data?.message === AuthApiErrorEnums.INVALID_CREDENTIALS) {
            throw new Error(SSRErrorsType.INVALID_CREDENTIALS);
          }

          // eslint-disable-next-line no-console
          console.error(e); // TODO use Sentry

          throw new Error(SSRErrorsType.UNKNOWN_API_ERROR);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.access;
        token.refreshToken = user?.refreshToken;
        token.expireIn = user?.expireIn;
      }

      return token;
    },
    async session(payload) {
      const { session, token, user } = payload;

      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        const player = await getPlayerInfos(token.accessToken);

        session.player = player;
      }

      if (user?.expireIn) {
        session.expires = user.expireIn?.toString();
      }

      return session;
    },
  },
  session: {
    // Required to call jwt callback when using "useSession" in "request.tsx"
    strategy: 'jwt',
    maxAge: 3600, // 1 hour in seconds
  },

  // ENV value required when deploying to production
  // https://next-auth.js.org/configuration/options#secret
  secret: process.env.SECRET,

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  // Enable debug messages in the console if you are having problems
  debug: Boolean(process.env.DEBUG_INFO),

  pages: {
    error: routePaths.error,
    signIn: routePaths.login,
    signOut: routePaths.home,
    // newUser: '/auth/new-user',
    // verifyRequest : '', // Check email message
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
