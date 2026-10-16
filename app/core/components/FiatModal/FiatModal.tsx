import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ModalProps } from '@/core/shared/Modal/Modal.types';
import { RadioGroup } from '@/core/shared/RadioGroup';
import { Button } from '@/core/shared/Button';
import { AvailableFiatCodes, FiatCodes } from '@/core/domains/currency';

import { ModalContainer, Paragraph, RadioWrapper, StyledModal } from './FiatModal.styles';

export type WalletModalFIATProps = ModalProps & {
  onChange: (currency?: FiatCodes) => void;
};

export const FiatModal: FC<WalletModalFIATProps> = ({ isOpen, setIsOpen, onChange }) => {
  const [activeFiatCurrency, setActiveFiatCurrency] = useState<FiatCodes>();

  return (
    <StyledModal isOpen={isOpen} setIsOpen={setIsOpen} hasCloseButton={false}>
      <ModalContainer>
        <Paragraph>
          <FormattedMessage id="fiat.note" defaultMessage="Please note that these are currency approximations." />
        </Paragraph>
        <Paragraph>
          <FormattedMessage
            id="fiat.description"
            defaultMessage="All bets & transactions will be settled in the crypto equivalent. For further details feel free to contact our live support."
          />
        </Paragraph>
        <RadioWrapper>
          <RadioGroup
            horizontal
            name="currency"
            onChange={(evt) => setActiveFiatCurrency(evt.target.value as (typeof AvailableFiatCodes)[number])}
            options={AvailableFiatCodes.map((fiat) => ({
              label: fiat.toUpperCase(),
              value: fiat,
            }))}
          />
        </RadioWrapper>
        <div>
          <Button onClick={() => onChange(activeFiatCurrency)}>
            <FormattedMessage id="fiat.saveButton" defaultMessage="Play now" />
          </Button>
        </div>
      </ModalContainer>
    </StyledModal>
  );
};
