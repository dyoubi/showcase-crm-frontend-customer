import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@/core/components/Typography';

import { LotteryFooter, VIPModalLotteryContainer } from './VIPModalLottery.styles';

export const VIPModalLottery: FC = () => {
  const chunksFunc = (chunks: any) => <b>{chunks}</b>;

  return (
    <VIPModalLotteryContainer>
      <Heading align="center" size="h3">
        <FormattedMessage id="vipModal.lotteryHeader" defaultMessage="$10,000 Monthly Lottery" />
      </Heading>
      <p>
        <FormattedMessage
          id="vipModal.lotteryCopy"
          defaultMessage="Wager to earn tickets into a giveaway where anybody can win. Just one ticket could see you sharing in $10,000 every months. With $1,000 wagered equating to one ticket, earn as many tickets as possible to give yourself the best chance of winning big!"
        />
      </p>
      <p data-mocked>
        <FormattedMessage
          id="vipModal.lotteryTickets"
          defaultMessage="Your number of tickets: {tickets}"
          values={{
            tickets: 5,
          }}
        />
      </p>
      <LotteryFooter data-mocked>
        <FormattedMessage
          id="vipModal.lotteryCopy2"
          defaultMessage="For a detailed breakdown of the prize and payout structure, please visit the <b>official announcement</b>."
          values={{
            b: chunksFunc,
          }}
        />
      </LotteryFooter>
    </VIPModalLotteryContainer>
  );
};
