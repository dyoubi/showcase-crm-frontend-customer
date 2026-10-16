import { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSession } from 'next-auth/react';

import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { useGetPlayerOtherTransactionsQuery } from '@/core/domains/transaction';
import { Card, CryptoIcon, Flex } from '@/core/shared';
import { IconLoader } from '@/core/shared/Icons';
import { Pagination } from '@/core/components/pagination/index';
import { Table } from '@/core/shared/Table';
import { Text } from '@/core/components/Typography';
import { DateFormatsByLanguage } from '@/core/constants/constants';

import { formatDateString } from '@/utils/date';
import { titleCase } from '@/utils/string';

export const OtherTransactionsTable: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { formatCryptoPrice } = useDisplayPrice();
  const { locale } = useIntl();
  const { data: session } = useSession();

  const { data, isLoading, isError, isFetching } = useGetPlayerOtherTransactionsQuery(
    {
      accessToken: session?.accessToken,
      page: currentPage,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    },
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading || isFetching) {
    return (
      <Card minHeight={200}>
        <Flex alignItems="center" justifyContent="center" height={200}>
          <IconLoader size={64} />
        </Flex>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card minHeight={200}>
        <Flex alignItems="center" justifyContent="center" height={200}>
          <FormattedMessage
            id="error.somethingWentWrongTryAgainOrReloadPage"
            defaultMessage="Something went wrong. Please try again or reload the page if the problem persist."
          />
        </Flex>
      </Card>
    );
  }

  if (!data?.transactions?.length && !data?.count) {
    return (
      <Card minHeight={200}>
        <Flex alignItems="center" justifyContent="center" height={200}>
          <FormattedMessage id="transactions.empty" defaultMessage="No results available for this transaction." />
        </Flex>
      </Card>
    );
  }

  const { transactions, count } = data;

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th scope="col">
              <Text level="small">
                <FormattedMessage id="global.date" defaultMessage="Date" />
              </Text>
            </th>

            <th scope="col">
              <Text level="small">
                <FormattedMessage id="global.category" defaultMessage="Category" />
              </Text>
            </th>

            <th scope="col">
              <Text level="small">
                <FormattedMessage id="global.amount" defaultMessage="Amount" />
              </Text>
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{formatDateString(transaction.createdAt, DateFormatsByLanguage[locale])}</td>

              <td>{titleCase(transaction.category)}</td>

              <td>
                <div>
                  <CryptoIcon code={transaction.currency} />

                  <span>
                    {formatCryptoPrice({
                      amount: transaction.amount,
                      cryptoCode: transaction.currency,
                    })}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Flex alignItems="center" justifyContent="center">
        <Pagination
          currentPage={currentPage}
          dataLength={count}
          perPage={10}
          setPage={handlePageChange}
          prevText="Prev"
          nextText="Next"
        />
      </Flex>
    </>
  );
};
