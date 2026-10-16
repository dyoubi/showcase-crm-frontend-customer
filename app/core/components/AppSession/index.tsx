import { Fragment, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

import { setCasinoApiAccessToken } from '@/core/domains/api';

type AppSessionProps = {
  children: ReactNode;
};

export const AppSession = ({ children }: AppSessionProps) => {
  const { data: session } = useSession();

  setCasinoApiAccessToken(session?.accessToken || '');

  return <Fragment key={session?.player?.id}>{children}</Fragment>;
};
