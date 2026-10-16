import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import { ContentContainer } from '@/core/components/Layout';
import { useGetProvidersQuery } from '@/core/domains/provider';
import { ProviderLogo } from '@/core/components/ProviderLogo';
import { routePaths } from '@/core/constants/routes';
import { IconSearch } from '@/core/shared/Icons';
import { FieldVariant } from '@/core/shared/FeedbackMessage';

import { ProvidersGrid, StyledSearchBar } from './ProvidersPage.styles';

export const Providers = () => {
  const { formatMessage } = useIntl();
  const { data } = useGetProvidersQuery();

  const [query, setQuery] = useState('');

  return (
    <ContentContainer>
      <StyledSearchBar
        placeholder={formatMessage({
          defaultMessage: 'Search providers',
          id: 'search.providers',
        })}
        iconLeft={<IconSearch />}
        value={query}
        selectable
        variant={FieldVariant.Default}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ProvidersGrid>
        {data
          ? [...data]
              .sort((a, b) => a.position - b.position)
              .map((provider: any) => {
                const visible = provider.activate && provider?.name.toLowerCase().includes(query.toLowerCase());

                return (
                  <Link
                    style={{ display: visible ? 'block' : 'none' }}
                    key={provider.id}
                    href={`${routePaths.category}/${provider.key}`}
                  >
                    <ProviderLogo image={provider?.image?.desktop?.url} name={provider?.name} mr={false} />
                  </Link>
                );
              })
          : null}
      </ProvidersGrid>
    </ContentContainer>
  );
};
