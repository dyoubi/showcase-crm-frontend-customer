import { InGameFiatCodes } from '@/core/domains/currency';
import { IconProps } from '@/core/shared/Icons/types';

export interface FiatIconProps extends IconProps {
  className?: string;
  code?: InGameFiatCodes;
}
