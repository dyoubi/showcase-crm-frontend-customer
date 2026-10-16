/**
 * Calls the given callback at the leading or trailing edge of a given delay.
 *
 * @param callback callback function to be triggered
 * @param delay milliseconds to wait between callback being called
 * @param reset forces the delay to be reset deferring callback until no reset is received for delay time.
 * @param immediate triggers the callback at the start of the delay rather than after the delay.
 * @returns {function(...[*]): undefined}
 */
export const debounce = (
  callback: (...args: Array<any>) => void,
  delay: number,
  reset = true,
  immediate = false,
): ((...args: Array<any>) => void) => {
  let timeout: NodeJS.Timeout | null;

  return (...args: Array<any>) => {
    if (!reset && timeout) {
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;

      if (!immediate) {
        callback(...args);
      }
    }, delay);

    if (immediate) {
      callback(...args);
    }
  };
};
