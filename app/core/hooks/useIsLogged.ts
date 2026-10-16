import { useSession } from 'next-auth/react';

export const useIsLogged = () => {
  const { data } = useSession();

  return !!data?.accessToken && !!data?.player?.id;
};
