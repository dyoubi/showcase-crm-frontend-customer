import { useContext } from 'react';

import { MediaContext, MediaContextTypes } from '@/libs/media-query';

export function useMediaContext(): MediaContextTypes {
  return useContext(MediaContext);
}
