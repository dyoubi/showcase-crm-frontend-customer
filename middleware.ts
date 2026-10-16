import { IncomingHttpHeaders } from 'http';
import { NextRequest, NextResponse, userAgent } from 'next/server';

import { routePaths } from '@/core/constants/routes';

import { CheckUAForMobile } from '@/utils/mobile';

import countries from './pages/api/countries/countries.json';

type Country = {
  code: string;
  full: string;
  EN: string;
  FR: string;
  active: boolean;
};

const isMobile = CheckUAForMobile;

const isTablet = (UAString: string): boolean => {
  return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
    UAString.toLowerCase(),
  );
};

const getIpCountry = (headers: IncomingHttpHeaders): string => {
  return Array.isArray(headers['cf-ipcountry']) ? headers['cf-ipcountry'][0] : headers['cf-ipcountry'] || '';
};

const isAllowedBot = (useragent?: string): boolean => {
  const allowedBots =
    /Googlebot|Bing|bingbot|msnbot|DuckDuckBot|Startpage|Teoma|Yahoo|Slurp|Yandex|AOLBuild|Baiduspider|Chrome-Lighthouse/gi;

  return !!useragent?.match(allowedBots);
};

const checkAllowed = (headers: Headers): boolean => {
  const headersObject: IncomingHttpHeaders = Object.fromEntries(headers.entries());

  const skipLocation =
    // eslint-disable-next-line dot-notation
    process.env['ENABLE_SKIP_LOCATION_CHECK']?.toLowerCase() === 'true';

  return (
    skipLocation ||
    countries
      .filter((c: Country) => c.active)
      .map((c: Country) => c.code?.toLocaleUpperCase())
      .includes(getIpCountry(headersObject)) ||
    isAllowedBot(headersObject['user-agent'])
  );
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const { ua } = userAgent(request);

  if (isMobile(ua)) {
    url.searchParams.set('deviceType', 'mobile');
  } else if (isTablet(ua)) {
    url.searchParams.set('deviceType', 'tablet');
  } else {
    url.searchParams.set('deviceType', 'desktop');
  }

  if (!checkAllowed(request.headers)) {
    const isPageRequest =
      !request.nextUrl.pathname.includes('.') && request.headers.get('accept')?.includes('text/html');

    if (isPageRequest) {
      return NextResponse.rewrite(new URL('/blocked', request.url));
    }

    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith(routePaths.profile)) {
    if (request.cookies.get('next-auth.session-token')) {
      return NextResponse.rewrite(url);
    }

    url.pathname = '/';

    return NextResponse.rewrite(url);
  }

  return NextResponse.rewrite(url);
}
