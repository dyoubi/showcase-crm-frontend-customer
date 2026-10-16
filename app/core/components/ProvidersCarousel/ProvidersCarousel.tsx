import { FC } from 'react';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import { Carousel } from '@/core/shared/Carousel';
import { ProviderLogo } from '@/core/components/ProviderLogo';
import { useGetProvidersQuery } from '@/core/domains/provider/providerSlice';
import { routePaths } from '@/core/constants/routes';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';

export const ProvidersCarousel: FC = () => {
  const { formatMessage } = useIntl();
  const { data } = useGetProvidersQuery();
  const { isTabletOrPhone } = useBreakpoints();

  return data ? (
    <Carousel
      lazyLoad="ondemand"
      header={formatMessage({
        id: 'carousel.providers',
        defaultMessage: 'Providers',
      })}
      customLink={routePaths.providers}
      slidesToShow={5}
      isTabletOrPhone={isTabletOrPhone}
      responsive={[
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 830,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            rows: 2,
            slidesPerRow: 2,
          },
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            rows: 2,
            slidesPerRow: 2,
          },
        },
      ]}
    >
      {data
        ?.filter((p) => p.activate)
        .sort((a, b) => a.position - b.position)
        .map((provider: any) => (
          <Link key={provider.id} href={`${routePaths.category}/${provider.key}`}>
            <ProviderLogo image={provider?.image?.desktop?.url} name={provider?.name} />
          </Link>
        ))}
    </Carousel>
  ) : null;
};
