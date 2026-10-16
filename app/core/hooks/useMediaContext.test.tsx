import { renderHook } from '@testing-library/react';

import { useMediaContext } from './useMediaContext';

import { defaultMediaContextMobile, MediaContext } from '@/libs/media-query';

describe('useMediaContext', () => {
  it('should return the default media context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MediaContext.Provider value={defaultMediaContextMobile}>{children}</MediaContext.Provider>
    );

    const { result } = renderHook(() => useMediaContext(), { wrapper });

    expect(result.current).toBe(defaultMediaContextMobile);
  });
});
