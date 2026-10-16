import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useRedirectIfNotLogged = (isLogged: boolean) => {
  const router = useRouter();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isLogged) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [isLogged, router]);
};
