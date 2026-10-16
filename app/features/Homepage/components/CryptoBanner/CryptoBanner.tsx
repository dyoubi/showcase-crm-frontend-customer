import { FC } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import {
  BannerCard,
  BannerContent,
  BuyButton,
  LeftContent,
  PaymentIconsContainer,
  PaymentLogoWrapper,
  Title,
} from './CryptoBanner.styles';

export const CryptoBanner: FC = () => {
  const { formatMessage } = useIntl();
  const { isTabletOrPhone } = useBreakpoints();
  const router = useRouter();

  const paymentMethods = [
    { name: 'Mastercard', src: '/images/logos/mastercard.svg', width: 60, height: 40 },
    { name: 'Visa', src: '/images/logos/visa.svg', width: 60, height: 40 },
    { name: 'Google Pay', src: '/images/logos/google-pay.svg', width: 60, height: 40 },
    { name: 'Apple Pay', src: '/images/logos/apple-pay.svg', width: 60, height: 40 },
  ];

  return (
    <BannerCard>
      <BannerContent>
        <LeftContent>
          <Title isTabletOrPhone={isTabletOrPhone}>
            {formatMessage({
              id: 'cryptoBanner.title',
              defaultMessage: 'Buy cryptocurrencies quickly and easily.',
            })}
          </Title>

          <PaymentIconsContainer isTabletOrPhone={isTabletOrPhone}>
            {paymentMethods.map((method) => (
              <PaymentLogoWrapper key={method.name}>
                <Image src={method.src} alt={method.name} width={method.width} height={method.height} />
              </PaymentLogoWrapper>
            ))}
          </PaymentIconsContainer>
        </LeftContent>

        <BuyButton onClick={() => router.push('/deposit')}>
          {formatMessage({
            id: 'cryptoBanner.buyNow',
            defaultMessage: 'Buy Now',
          })}
        </BuyButton>
      </BannerContent>
    </BannerCard>
  );
};
