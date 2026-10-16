import styled from 'styled-components';

import { Button as ButtonRaw } from '@/core/shared/Button';

const topStyles = {
  borderRightWidth: 1,
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
} as const;

const bottomStyles = {
  borderRightWidth: 1,
  borderTopRightRadius: 8,
  borderBottomRightRadius: 8,
} as const;

export const Button = styled(ButtonRaw)<{ isTop: boolean; isSelected: boolean }>(({ isTop }) => ({
  padding: '5px 6px',
  borderRadius: 'unset',
  ...(isTop ? topStyles : bottomStyles),
}));
