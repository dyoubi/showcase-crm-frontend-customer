import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('should call the callback after the delay', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 1000);

    debouncedFunction();
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toBeCalled();
  });

  it('should call the callback immediately if immediate is true', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 1000, true, true);

    debouncedFunction();
    expect(callback).toBeCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should reset the delay if reset is true', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 1000);

    debouncedFunction();
    jest.advanceTimersByTime(500);
    debouncedFunction();
    jest.advanceTimersByTime(500);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(500);
    expect(callback).toBeCalled();
  });

  it('should not reset the delay if reset is false', () => {
    const callback = jest.fn();
    const debouncedFunction = debounce(callback, 1000, false);

    debouncedFunction();
    jest.advanceTimersByTime(500);
    debouncedFunction();
    jest.advanceTimersByTime(500);
    expect(callback).toBeCalled();
  });
});
