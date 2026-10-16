import { CryptoCodes } from '@/core/domains/currency';
import { IconProps } from '@/core/shared/Icons/types';

export interface CryptoIconProps extends IconProps {
  code?: CryptoCodes;
  className?: string;
}
