import { GetServerSideProps } from 'next';
import { useIntl } from 'react-intl';

import { Layout } from '@/core/components/Layout';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { NeedAuthMessage } from '@/core/components/NeedAuthMessage';
import { NestedLayout } from '@/core/components/Layout/NestedLayout';
import { transactionMenu } from '@/core/constants/pageMenu';
import { TransactionType } from '@/core/domains/transaction';
import { useRedirectIfNotLogged } from '@/core/hooks/useRedirectIfNotLogged';
import { routePaths } from '@/core/constants/routes';
// import { BetsTable } from '@/core/components/BetsTable';

import { DepositsTable, OtherTransactionsTable, WithdrawalsTable } from '@/features/TransactionsPage';

import { wrapperServerSideProps } from '@/libs/next';

const Transactions = ({ type }: { type: TransactionType }) => {
  const { formatMessage } = useIntl();
  const isLogged = useIsLogged();

  useRedirectIfNotLogged(isLogged);

  if (!isLogged) {
    return (
      <Layout title="Transactions">
        <NeedAuthMessage />
      </Layout>
    );
  }

  const render = () => {
    // if (routePaths.transactions.bets.includes(type)) {
    //   return <BetsTable />;
    // }

    if (routePaths.transactions.deposits.includes(type)) {
      return <DepositsTable />;
    }

    if (routePaths.transactions.other.includes(type)) {
      return <OtherTransactionsTable />;
    }

    if (routePaths.transactions.withdrawals.includes(type)) {
      return <WithdrawalsTable />;
    }

    // This line should not be executed as we are already redirecting users before they load the page.
    return null;
  };

  return (
    <Layout title="Transactions">
      <NestedLayout
        title={formatMessage({ id: 'page.transactions', defaultMessage: 'Transactions' })}
        menuItems={transactionMenu}
      >
        {render()}
      </NestedLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ context }) => {
  const {
    query: { type, page = 1 },
  } = context;

  if (!type || Array.isArray(type) || !Object.prototype.hasOwnProperty.call(routePaths.transactions, type)) {
    return {
      redirect: {
        permanent: false,
        destination: routePaths.transactions.deposits,
      },
    };
  }

  return {
    props: {
      type,
      page,
    },
  };
});

export default Transactions;
