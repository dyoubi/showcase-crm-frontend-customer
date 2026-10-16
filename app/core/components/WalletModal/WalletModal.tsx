import { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { ButtonColor } from '@/core/shared/Button/Button.types';

import { Box } from '../../shared/Box';
import { ButtonGroup } from '../../shared/ButtonGroup';
import { Modal } from '../../shared/Modal';
import { TabButton, TabContainer } from './WalletModal.styles';
import { WalletModalProps, WalletModalTab } from './WalletModal.types';
import { WalletModalDeposit } from './WalletModalDeposit/WalletModalDeposit';
import { WalletModalWithdraw } from './WalletModalWithdraw/WalletModalWithdraw';
import { WalletModalBuy } from './WalletModalBuy/WalletModalBuy';

export const WalletModal: FC<WalletModalProps> = ({ isOpen, setIsOpen }) => {
  const { formatMessage } = useIntl();
  const [selectedTab, setSelectedTab] = useState<WalletModalTab>(WalletModalTab.Deposit);

  return (
    <Modal
      header={formatMessage({
        defaultMessage: 'Wallet',
        id: 'walletModal.header',
      })}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <TabContainer>
        <ButtonGroup>
          <TabButton
            color={ButtonColor.Tertiary}
            isSelected={selectedTab === WalletModalTab.buy}
            onClick={() => setSelectedTab(WalletModalTab.buy)}
          >
            <FormattedMessage id="walletModal.buy" defaultMessage="Buy Crypto" />
          </TabButton>
          <TabButton
            color={ButtonColor.Tertiary}
            isSelected={selectedTab === WalletModalTab.Deposit}
            onClick={() => setSelectedTab(WalletModalTab.Deposit)}
          >
            <FormattedMessage id="walletModal.deposit" defaultMessage="Deposit" />
          </TabButton>

          <TabButton
            color={ButtonColor.Tertiary}
            isSelected={selectedTab === WalletModalTab.Withdraw}
            onClick={() => setSelectedTab(WalletModalTab.Withdraw)}
          >
            <FormattedMessage id="walletModal.withdraw" defaultMessage="Withdraw" />
          </TabButton>
        </ButtonGroup>
      </TabContainer>

      <Box mt="m">
        {selectedTab === WalletModalTab.Deposit ? <WalletModalDeposit /> : null}
        {selectedTab === WalletModalTab.Withdraw ? <WalletModalWithdraw setIsOpen={setIsOpen} /> : null}
        {selectedTab === WalletModalTab.buy ? <WalletModalBuy /> : null}
      </Box>
    </Modal>
  );
};
