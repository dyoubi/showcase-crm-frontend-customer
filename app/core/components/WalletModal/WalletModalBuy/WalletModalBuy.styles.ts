import styled from 'styled-components';

import { Button, Select } from '@/core/shared';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSelect = styled(Select)(({ theme }) => ({
  '.select__single-value': {
    paddingBottom: '2px',
    color: '#fffc',
  },
  '.select__value-container': {
    paddingLeft: '24px',
  },
}));

export const CurrencySectionWrapper = styled.div(({ theme }) => ({
  width: '100%',
  display: 'inline-flex',
  padding: '2px',
  margin: '16px 0px 8px',
  borderRadius: '8px',
  background: theme.rebrandingColors.gradients.blue,
}));

export const CurrencySectionInner = styled.div(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: theme.rebrandingColors.palette.dark[40],
  padding: '8px 12px',
  borderRadius: '6px',
}));

export const CurrencyIcon = styled.div`
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
`;

export const SelectBox = styled.div`
  position: relative;
`;

export const FormError = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export const PaymentWrapper = styled.div(({ theme }) => ({
  borderBottom: `2px solid ${theme.rebrandingColors.palette.light[60]}`,
  paddingBottom: '16px',
}));

export const PaymentButton = styled(Button)<{ selected: boolean }>(({ theme, selected }) => ({
  width: '100%',
  height: '40px',
  background: selected ? theme.rebrandingColors.gradients.blue : theme.rebrandingColors.palette.dark[60],
  borderRadius: '6px',
}));

export const BuyButton = styled(Button)(() => ({
  width: '100%',
  padding: '8px',
  fontSize: '14px',
  opacity: 0.8,
}));

export const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
`;

export const OfferOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
`;

export const TermsCheckbox = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 16px;
`;

export const TermsNote = styled.div(({ theme }) => ({
  marginTop: '16px',
  paddingBottom: '16px',
  fontSize: '12px',
  color: theme.rebrandingColors.palette.light[60],
  textAlign: 'center',
  lineHeight: '1.4',
}));

export const CurrencySelect = styled.select`
  appearance: none;
  border: none;
  outline: none;
  padding: 6px 28px 6px 32px; /* espacio para ícono + caret */
  border-radius: 6px;
  background: #1a1a40;
  color: #fff;
  font-size: 14px;
  font-weight: 600;

  option {
    color: #000;
  } /* accesibilidad en el desplegable */
`;

export const AmountInput = styled.input.attrs({ inputMode: 'decimal' })`
  flex: 1;
  min-width: 60px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  outline: none;

  &::placeholder {
    color: #444c6f;
  }
`;

export const ClearBtn = styled.button`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #fffc;

  &:hover {
    color: #fff;
  }
`;

export const OfferLogo = styled.div(({ theme }) => ({
  width: '100%',
  height: '40px',
  borderRadius: '6px',
  padding: '8px 12px',
  backgroundColor: theme.rebrandingColors.palette.light[80],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
