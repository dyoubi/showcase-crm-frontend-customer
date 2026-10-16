import { createContext, ReactNode, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';

import { useAppCookies } from '@/core/hooks/useAppCookies';
import { LOCALE } from '@/core/constants/cookies';

import { mapTranslations } from './constants';

export const TranslationContext = createContext({
  locale: false,
});

export type TranslationProps = {
  children: ReactNode;
};

export const Translation = ({ children }: TranslationProps) => {
  const { setCookie } = useAppCookies();
  const { locale, defaultLocale } = useRouter();

  useEffect(() => {
    if (locale) {
      setCookie(LOCALE, locale as 'fr' | 'en');
    }
  }, [locale, setCookie]);

  return (
    <IntlProvider
      messages={mapTranslations?.[locale as 'en' | 'fr'] || mapTranslations.en}
      locale={locale || 'en'}
      defaultLocale={defaultLocale}
    >
      {children}
    </IntlProvider>
  );
};
