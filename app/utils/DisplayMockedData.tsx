import { useEffect, VFC } from 'react';
import { useRouter } from 'next/router';

import { DISPLAY_MOCKED, useAppCookies } from '@/core/hooks/useAppCookies';

/* TODO: Temporary helper. Things to remove when all mocked data will be replaced by real data:
 *  - DisplayMockedData.tsx
 *  - Global css for mocked items in globalStyles.ts
 *  - All [data-mocked] attributes
 * */
export const DisplayMockedData: VFC = () => {
  const router = useRouter();
  const {
    cookies: { displayMocked },
    setCookie,
  } = useAppCookies();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setTimeout(() => {
      const body = document.querySelector('body');

      if (displayMocked) {
        body?.classList.add('displayMocked');
      } else {
        body?.classList.remove('displayMocked');
      }
    }, 100);
  }, [displayMocked]);

  useEffect(() => {
    const displayMockedParam = router.query['display-mocked'];

    if (!displayMockedParam) {
      return;
    }

    setCookie(DISPLAY_MOCKED, displayMockedParam === 'true');
  }, [setCookie, router.query]);

  return null;
};
