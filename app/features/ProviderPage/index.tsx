import { useRouter } from 'next/router';

import { GamesList } from '@/core/components/GamesList';
import { useGetProviderMachineViewsQuery } from '@/core/domains/provider';

export const ProviderPage = () => {
  const {
    query: { slug: providerSlug },
    isFallback,
  } = useRouter();
  const { data: providerMachines } = useGetProviderMachineViewsQuery({ slug: providerSlug }, { skip: isFallback });
  const bannerURL = 'https://main.media-server.egamingchain.io/files/71F4C74E1D4419B9A4ED283BD6268CE7';

  return <GamesList machinesViews={providerMachines ?? []} headerImageUrl={bannerURL} />;
};
