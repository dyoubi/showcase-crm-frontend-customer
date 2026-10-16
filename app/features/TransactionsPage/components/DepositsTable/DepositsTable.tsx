import { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSession } from 'next-auth/react';

import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { useGetPlayerDepositsQuery } from '@/core/domains/transaction';
import { Card, CryptoIcon, Flex } from '@/core/shared';
import { IconLoader } from '@/core/shared/Icons';
import { Pagination } from '@/core/components/pagination/Pagination';
import { Table } from '@/core/shared/Table';
import { Text } from '@/core/components/Typography';
import { DateFormatsByLanguage } from '@/core/constants/constants';
import { useAppCookies } from '@/core/hooks/useAppCookies';

import { formatDateString } from '@/utils/date';

import { StatusCell } from '../../styles';

export const DepositsTable: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    cookies: { displayInFiat = false },
  } = useAppCookies();

  const { formatPrice, formatCryptoPrice } = useDisplayPrice();
  const { locale } = useIntl();
  const { data: session } = useSession();

  const { data, isLoading, isError, isFetching } = useGetPlayerDepositsQuery(
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
      <Card>
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

  const { count, transactions } = data;

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
                <FormattedMessage id="global.amount" defaultMessage="Amount" />
              </Text>
            </th>

            <th scope="col">
              <Text level="small">
                <FormattedMessage id="global.status" defaultMessage="Status" />
              </Text>
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{formatDateString(transaction.createdAt, DateFormatsByLanguage[locale])}</td>

              <td>
                <div>
                  <CryptoIcon code={transaction.currency} />

                  <span>
                    {displayInFiat
                      ? formatCryptoPrice({
                          amount: transaction.amount,
                          cryptoCode: transaction.currency,
                          bypassUnitConversion: true,
                        })
                      : formatPrice({
                          amount: transaction.amount,
                          currency: transaction.currency,
                          roundingPriority: 'morePrecision',
                        })}
                  </span>
                </div>
              </td>

              <td>
                <StatusCell status={transaction.status}>{transaction.status}</StatusCell>
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
