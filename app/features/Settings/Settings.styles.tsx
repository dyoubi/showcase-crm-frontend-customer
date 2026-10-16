import styled from 'styled-components';

import { Heading } from '@/core/components/Typography/Heading';
import { Text } from '@/core/components/Typography/Text';
import { Button } from '@/core/shared/Button';

export const SettingsContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: theme.padding.l,
}));

export const StyledHeading = styled(Heading)(({ theme }) => ({
  marginBottom: theme.margin.xs,
}));

export const CheckboxContainer = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.margin.s,
}));

export const StyledText = styled(Text)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.margin.xxs,
}));

export const StyledButton = styled(Button)(({ theme, disabled }) => ({
  margin: '40px auto',
  paddingBlock: theme.padding.s,
  pointerEvents: disabled ? 'none' : 'auto',
}));

export const LinkText = styled(Text).attrs({
  level: 'small',
  as: 'span',
})(({ theme }) => ({
  marginLeft: theme.margin.xxs,
  fontWeight: 700,
  cursor: 'pointer',
  color: theme.rebrandingColors.palette.gray[20],
}));

export const CodeContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  background: theme.rebrandingColors.palette.dark[20],
  marginBottom: theme.margin.xxs,
}));
