import { useIntl } from 'react-intl';
import { GetServerSideProps } from 'next';

import { Layout } from '@/core/components/Layout';

import { VipPage } from '@/features/VipPage';

import { wrapperServerSideProps } from '@/libs/next';

export const Vip = () => {
  const { formatMessage } = useIntl();

  return (
    <Layout
      title={formatMessage({
        id: 'page.vip',
        defaultMessage: 'VIP',
      })}
    >
      <VipPage />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(() => ({ props: {} }));

export default Vip;
