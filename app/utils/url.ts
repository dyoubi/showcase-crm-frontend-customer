/**
 * This helper will add an "/" if there is not at the end of the string
 * for example:
 * addSlashIfNotPresent('http://google.com')
 * will return 'http://google.com/'
 * and
 * addSlashIfNotPresent('http://google.com/')
 * will return 'http://google.com/'
 */
export const addSlashIfNotPresent = (str = '') => {
  const hasSlashAtTheEnds = (str || '').endsWith('/');

  return hasSlashAtTheEnds ? str : `${str}/`;
};

export const encodeFilter = <C>(param: C) => encodeURIComponent(JSON.stringify(param));
