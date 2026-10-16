import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '@/core/shared/Button';

import { Divider } from '../../../shared/Divider';
import { WalletModal2FAContainer } from './WalletModal2FA.styles';

export const WalletModal2FA: FC = () => (
  <WalletModal2FAContainer data-mocked>
    <Divider center m="l" width={200} />
    <p>
      <FormattedMessage
        id="walletDeposit.2faCopy"
        defaultMessage="Improve your account security with Two-Factor Authentification"
      />
    </p>
    <p>
      <Button>
        <FormattedMessage id="walletDeposit.2faEnableButton" defaultMessage="Enable 2FA" />
      </Button>
    </p>
  </WalletModal2FAContainer>
);
