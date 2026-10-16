import { useIntl } from 'react-intl';
import { GetServerSideProps } from 'next';

import { Layout } from '@/core/components/Layout';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { NeedAuthMessage } from '@/core/components/NeedAuthMessage';

import { FavoriteGamesPage } from '@/features/FavoriteGamesPage';

import { wrapperServerSideProps } from '@/libs/next';

export const FavoritesGames = () => {
  const { formatMessage } = useIntl();
  const isLogged = useIsLogged();

  return (
    <Layout
      title={formatMessage({
        id: 'favorites',
        defaultMessage: 'Favorites',
      })}
    >
      {isLogged ? <FavoriteGamesPage /> : <NeedAuthMessage />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(() => ({ props: {} }));

export default FavoritesGames;
