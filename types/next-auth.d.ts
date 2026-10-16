import NextAuth, { User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { Nullable } from '@/core/interfaces/common';
import { Player } from '@/core/domains/player';

declare module 'next-auth' {
  interface User {
    id: string;
    access: string;
    refreshToken: string;
    expireIn: number;
  }

  interface Session {
    accessToken: string | null;
    player: Player | null;
    expires: string | null;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  export interface JWT {
    accessToken: Nullable<string>;
    // refreshToken: Nullable<string>;
    error?: string;
  }
}
