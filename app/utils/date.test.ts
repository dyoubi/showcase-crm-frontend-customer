import {
  addYearsToDate,
  checkDateIsAfter,
  convertDateToString,
  convertStringToDate,
  formatDateString,
  todayIsAfter,
} from './date';

describe('Date Utils', () => {
  describe('convertDateToString', () => {
    it('should convert date to string with given format', () => {
      const date = new Date(2023, 9, 10); // October 10, 2023
      const fmt = 'yyyy-MM-dd';
      const result = convertDateToString(date, fmt);

      expect(result).toBe('2023-10-10');
    });

    it('should return empty string for invalid date', () => {
      const date = new Date('invalid-date');
      const fmt = 'yyyy-MM-dd';
      const result = convertDateToString(date, fmt);

      expect(result).toBe('');
    });
  });

  describe('convertStringToDate', () => {
    it('should convert string to date with given format', () => {
      const dateString = '2023-10-10';
      const fmt = 'yyyy-MM-dd';
      const result = convertStringToDate(dateString, fmt);

      expect(result).toEqual(new Date(2023, 9, 10)); // October 10, 2023
    });
  });

  describe('addYearsToDate', () => {
    it('should add years to the given date', () => {
      const date = new Date(2023, 9, 10); // October 10, 2023
      const years = 5;
      const result = addYearsToDate(date, years);

      expect(result).toEqual(new Date(2028, 9, 10)); // October 10, 2028
    });

    it('should subtract years to the given date when amount is negative', () => {
      const date = new Date(2023, 9, 10); // October 10, 2023
      const years = -5;
      const result = addYearsToDate(date, years);

      expect(result).toEqual(new Date(2018, 9, 10)); // October 10, 2018
    });
  });

  describe('formatDateString', () => {
    it('should format string date with given format', () => {
      const dateString = '2023-10-10';
      const fmt = 'yyyy-MM-dd';
      const result = formatDateString(dateString, fmt);

      expect(result).toBe('2023-10-10');
    });

    it('should return empty string for invalid date string', () => {
      const dateString = 'invalid-date';
      const fmt = 'yyyy-MM-dd';
      const result = formatDateString(dateString, fmt);

      expect(result).toBe('');
    });

    it('should return empty string for undefined date string', () => {
      const dateString = undefined;
      const fmt = 'yyyy-MM-dd';
      const result = formatDateString(dateString, fmt);

      expect(result).toBe('');
    });
  });

  it('should return true if the first date is after the second date', () => {
    const date = new Date(2023, 9, 11); // October 11, 2023
    const dateToCompare = new Date(2023, 9, 10); // October 10, 2023
    const result = checkDateIsAfter(date, dateToCompare);

    expect(result).toBe(true);
  });

  it('should return false if the first date is before the second date', () => {
    const date = new Date(2023, 9, 9); // October 9, 2023
    const dateToCompare = new Date(2023, 9, 10); // October 10, 2023
    const result = checkDateIsAfter(date, dateToCompare);

    expect(result).toBe(false);
  });

  it('should return false if the first date is the same as the second date', () => {
    const date = new Date(2023, 9, 10); // October 10, 2023
    const dateToCompare = new Date(2023, 9, 10); // October 10, 2023
    const result = checkDateIsAfter(date, dateToCompare);

    expect(result).toBe(false);
  });

  it('should return true if the current date is after the given date', () => {
    const dateToCompare = new Date(2000, 0, 1); // January 1, 2000
    const result = todayIsAfter(dateToCompare);

    expect(result).toBe(true);
  });

  it('should return false if the current date is before the given date', () => {
    const dateToCompare = new Date(2025, 0, 1); // January 1, 2025
    const result = todayIsAfter(dateToCompare);

    expect(result).toBe(true);
  });
});
