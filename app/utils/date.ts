import { addYears, format, isAfter, Locale, parse } from 'date-fns';
import { enGB, fr } from 'date-fns/locale';

const localeMap: { [key: string]: Locale } = {
  en: enGB,
  fr,
};

export const convertDateToString = (date: Date, fmt: string): string => {
  try {
    return format(date, fmt);
  } catch (ex) {
    return '';
  }
};

export const convertStringToDate = (dateString: string, fmt: string): Date => parse(dateString, fmt, new Date());

export const addYearsToDate = (date: Date, years: number): Date => addYears(date, years);

const isValidDateString = (date: string) => {
  return !!new Date(date);
};

export const formatDateString = (dateString: string | undefined, fmt: string, locale?: string): string => {
  try {
    if (!dateString) {
      return '';
    }
    const parsedDate = isValidDateString(dateString) ? new Date(dateString) : convertStringToDate(dateString, fmt);

    return format(parsedDate, fmt, { locale: localeMap[locale || 'en'] });
  } catch (ex) {
    return '';
  }
};

export const checkDateIsAfter = (date: Date, dateToCompare: Date): boolean => isAfter(date, dateToCompare);

export const todayIsAfter = (dateToCompare: Date): boolean => checkDateIsAfter(new Date(), dateToCompare);
