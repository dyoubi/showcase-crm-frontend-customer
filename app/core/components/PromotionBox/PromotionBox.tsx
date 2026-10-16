import Link from 'next/link';

import { PromoImage } from './PromotionBox.styles';
import { PromotionBoxProps } from './PromotionBox.types';

export const PromotionBox = ({ src, link, onClick }: PromotionBoxProps) =>
  link ? (
    <Link href={link} data-testid="promotion-link">
      <PromoImage src={src} alt="promotion image" data-testid="promotion-image-with-link" />
    </Link>
  ) : (
    <PromoImage src={src} alt="promotion image" onClick={onClick} data-testid="promotion-image" />
  );
