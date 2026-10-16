import Image from 'next/image';

import { ProviderLogoBox, StyledProviderLogo } from './Provider.styles';
import { ProviderLogoProps } from './Provider.types';

export const ProviderLogo = ({ image, name, mr }: ProviderLogoProps) => {
  return (
    <ProviderLogoBox mr={mr}>
      <StyledProviderLogo>
        {image && <Image src={image || ''} alt={name || ''} fill style={{ objectFit: 'contain' }} unoptimized />}
      </StyledProviderLogo>
    </ProviderLogoBox>
  );
};
