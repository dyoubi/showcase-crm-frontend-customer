import { MaskedRange } from 'imask';

export const DateBlocks = {
  dd: {
    mask: MaskedRange,
    from: 1,
    to: 31,
    maxLength: 2,
  },
  MM: {
    mask: MaskedRange,
    from: 1,
    to: 12,
    maxLength: 2,
  },
  yyyy: {
    mask: MaskedRange,
    from: 1900,
    to: 9999,
  },
} as const;

export const MaskInputClassName = 'mask-input';
