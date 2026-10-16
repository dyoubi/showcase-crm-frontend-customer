import { FC, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { IconDocumentCopy, IconTickCircle } from '@/core/shared/Icons';

import { theme } from '@/themes/main';

import { StyledWalletCopyAddressInput, WalletInputTooltip } from './WalletCopyAddressInput.styles';
import { WalletCopyAddressInputProps } from './WalletCopyAddressInput.props';

const TOOLTIP_DELAY = 3000; // 3s

export const WalletCopyAddressInput: FC<WalletCopyAddressInputProps> = ({ value }) => {
  const referralInputRef = useRef<HTMLInputElement>(null);

  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleCopy = () => {
    if (referralInputRef?.current) {
      referralInputRef.current.select();
      navigator.clipboard.writeText(referralInputRef.current.value);

      setShowTooltip(true);

      setTimeout(() => {
        setShowTooltip(false);
      }, TOOLTIP_DELAY);
    }
  };

  return (
    <>
      <StyledWalletCopyAddressInput
        iconRight={<IconDocumentCopy onClick={handleCopy} />}
        readOnly
        ref={referralInputRef}
        value={value}
      />
      {showTooltip && (
        <WalletInputTooltip>
          <IconTickCircle color={theme.rebrandingColors.palette.green[20]} />
          <FormattedMessage id="copyBox.copySuccessMessage" defaultMessage="Copied to Clipboard!" />
        </WalletInputTooltip>
      )}
    </>
  );
};
