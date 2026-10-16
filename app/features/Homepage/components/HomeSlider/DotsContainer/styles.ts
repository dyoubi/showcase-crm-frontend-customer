import styled from 'styled-components';

import { Flex } from '@/core/shared/Flex';

export const Container = styled(Flex)(({ theme }) => ({
  overflow: 'hidden',
}));

export const Ul = styled.ul({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
  padding: 0,
  margin: 0,
  gap: '10px',
});

export const Box = styled.div<{ isPhone?: boolean }>(({ theme, isPhone }) => ({
  display: 'flex',
  alignItems: 'center',
  height: isPhone ? 10 : 20,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  paddingLeft: theme.padding.m,
  paddingRight: theme.padding.m,

  li: {
    display: 'flex',
    padding: 0,
    alignItems: 'center',
    listStyle: 'none',
    borderRadius: '7px',
    background: theme.rebrandingColors.palette.dark[60],
  },

  '*.slick-active': {
    background: theme.rebrandingColors.gradients.blue,
  },
}));
