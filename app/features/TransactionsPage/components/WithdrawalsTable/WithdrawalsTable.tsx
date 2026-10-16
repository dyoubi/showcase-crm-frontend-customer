import { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSession } from 'next-auth/react';

import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { useGetPlayerWithdrawalsQuery, WithdrawalTransaction } from '@/core/domains/transaction';
import { Button, Card, CryptoIcon, Flex } from '@/core/shared';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';
import { IconLoader } from '@/core/shared/Icons';
import { Pagination } from '@/core/components/pagination/index';
import { Text } from '@/core/components/Typography';
import { DateFormatsByLanguage } from '@/core/constants/constants';
import { useAppCookies } from '@/core/hooks/useAppCookies';

import { formatDateString } from '@/utils/date';

import { StatusCell, WithdrawlTable } from '../../styles';
import { WithdrawalRetractModal } from './WithdrawalRetractModal';

export const WithdrawalsTable: FC = () => {
  const {
    cookies: { displayInFiat = false },
  } = useAppCookies();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawalId, setWithdrawalId] = useState<WithdrawalTransaction['id'] | undefined>();

  const { formatPrice, formatCryptoPrice } = useDisplayPrice();
  const { locale } = useIntl();
  const { data: session } = useSession();

  const { data, isLoading, isError, isFetching } = useGetPlayerWithdrawalsQuery(
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

  const handleRetractDemand = (newWithdrawalId: string) => {
    setWithdrawalId(newWithdrawalId);
    setIsModalOpen(true);
  };

  const render = () => {
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

    const { count, transactions } = data;

    return (
      <>
        <WithdrawlTable>
          <thead>
            <tr>
              <th scope="col">
                <Text level="small">
                  <FormattedMessage id="global.date" defaultMessage="Date" />
                </Text>
              </th>

              <th scope="col">
                <Text level="small">
                  <FormattedMessage id="global.address" defaultMessage="Address" />
                </Text>
              </th>

              <th scope="col">
                <Text level="small">
                  <FormattedMessage id="global.amount" defaultMessage="Amount" />
                </Text>
              </th>

              <th scope="col">
                <Text level="small">
                  <FormattedMessage id="global.fees" defaultMessage="Fees" />
                </Text>
              </th>

              <th scope="col">
                <Text level="small">
                  <FormattedMessage id="global.action" defaultMessage="Action" />
                </Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="date">
                  <span className="hanging">
                    <StatusCell status={transaction.status}>{transaction.status}</StatusCell>
                  </span>
                  {formatDateString(transaction.createdAt, DateFormatsByLanguage[locale])}
                </td>

                <td>
                  <pre>{transaction.address}</pre>
                </td>

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
                  <div>
                    <CryptoIcon code={transaction.currency} />

                    <span>
                      {displayInFiat
                        ? formatCryptoPrice({
                            amount: transaction.fees,
                            cryptoCode: transaction.currency,
                            bypassUnitConversion: true,
                          })
                        : formatPrice({
                            amount: transaction.fees,
                            currency: transaction.currency,
                            roundingPriority: 'morePrecision',
                          })}
                    </span>
                  </div>
                </td>

                <td>
                  {transaction.canCancel && (
                    <Button
                      color={ButtonColor.Secondary}
                      onClick={() => handleRetractDemand(transaction.id)}
                      size={ButtonSize.Small}
                    >
                      <FormattedMessage id="global.retract" defaultMessage="Retract" />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </WithdrawlTable>

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

  return (
    <>
      {render()}

      <WithdrawalRetractModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} withdrawalId={withdrawalId} />
    </>
  );
};
