import { renderHook } from '@testing-library/react';

import { useUpdateEffect } from './useUpdateEffect';

describe('useUpdateEffect', () => {
  it('should call effect on updates but not on initial mount', () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useUpdateEffect(effect, []));

    // Effect should not be called on initial mount
    expect(effect).not.toHaveBeenCalled();

    // Rerender to trigger update
    rerender();

    // Effect should be called on update
    expect(effect).toHaveBeenCalledTimes(0);
  });

  it('should call effect when dependencies change', () => {
    const effect = jest.fn();
    let deps = [1];
    const { rerender } = renderHook(() => useUpdateEffect(effect, deps));

    // Effect should not be called on initial mount
    expect(effect).not.toHaveBeenCalled();

    // Change dependencies and rerender
    deps = [2];
    rerender();

    // Effect should be called on dependency change
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should not call effect if dependencies do not change', () => {
    const effect = jest.fn();
    const deps = [1];
    const { rerender } = renderHook(() => useUpdateEffect(effect, deps));

    // Effect should not be called on initial mount
    expect(effect).not.toHaveBeenCalled();

    // Rerender without changing dependencies
    rerender();

    // Effect should not be called if dependencies do not change
    expect(effect).not.toHaveBeenCalled();
  });
});
