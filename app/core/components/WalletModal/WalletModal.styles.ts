import styled from 'styled-components';

import { Button } from '@/core/shared/Button';
import { ButtonSize } from '@/core/shared/Button/Button.types';

import { mq, screen } from '@/libs/media-query';

export const TabContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

export const TabButton = styled(Button)(({ theme }) => ({
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  width: '33%',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    fontSize: theme.typography.button[ButtonSize.Small].fontSize,
    lineHeight: theme.typography.button[ButtonSize.Small].lineHeight,
    letterSpacing: theme.typography.button[ButtonSize.Small].letterSpacing,
    padding: theme.sizes.button.padding[ButtonSize.Small],
  },
}));
