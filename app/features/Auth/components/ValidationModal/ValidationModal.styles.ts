import styled from 'styled-components';

import { Button, Flex, Modal } from '@/core/shared';
import { Heading } from '@/core/components/Typography';

export const StyledModal = styled(Modal)({
  boxShadow: 'none !important',
  maxWidth: 500,
});

export const Container = styled(Flex)({
  flexDirection: 'column',
  justifyContent: 'end',
  alignItems: 'center',
  paddingTop: 164,
});

export const Content = styled.p(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[20],
  textAlign: 'center',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.rebrandingColors.palette.light[20],
  color: '#000000',
  '&:hover': {
    filter: 'brightness(0.7)',
    color: '#000000',
  },
}));

export const StyledHeading = styled(Heading)(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[20],
}));
