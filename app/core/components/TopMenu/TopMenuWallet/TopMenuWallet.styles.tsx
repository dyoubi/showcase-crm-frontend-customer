import styled from 'styled-components';

import { DropdownContainer } from '@/core/components/Dropdown';
import { CryptoIcon as CryptoIconRaw } from '@/core/shared/CryptoIcon';
import { Button } from '@/core/shared/Button';

import { getTypography } from '@/themes/mixins';

import { mq, screen } from '@/libs/media-query';

export const TopMenuWalletWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flex: 0,
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.padding.xxs,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    paddingLeft: 0,
  },
}));

export const TopMenuWalletContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: 35,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: 200,
  },
}));

export const CheckboxWrapper = styled.div({
  flex: 1,
});

export const CheckboxLabel = styled.span(({ theme }) => ({
  display: 'block',
  flex: 1,
  ...getTypography(theme.typography.body.medium),
}));

export const WalletButton = styled(Button)(({ theme }) => ({
  width: 'max-content',
  padding: `8px ${theme.padding.xl}`,
  borderRadius: '0 6px 6px 0',
  fontSize: theme.typography.button.small.fontSize,
  svg: {
    display: 'none',
  },
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: 35,
    paddingLeft: theme.padding.xxs,
    paddingRight: theme.padding.xxs,
    span: {
      display: 'none',
    },
    svg: {
      display: 'block',
      width: 20,
      height: 20,
    },
  },
}));

export const StyledDropdownContainer = styled(DropdownContainer)(({ theme }) => ({
  width: 194,
  height: 35,
  borderRadius: '6px 0 0 6px !important',
  fontSize: theme.typography.button.small.fontSize,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: 160,
    padding: 0,
  },
}));

export const TinyCryptoIcon = styled(CryptoIconRaw)(({ theme }) => ({
  marginLeft: theme.margin.xxs,
}));

export const FiatButtonIcon = styled.div<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  width: 18,
  height: 18,
  backgroundColor: isSelected ? theme.rebrandingColors.palette.light[20] : theme.rebrandingColors.palette.light[40],
  borderRadius: '50%',
  alignSelf: 'center',
}));
