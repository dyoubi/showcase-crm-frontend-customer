import styled from 'styled-components';

import { CardProps } from './Card.types';

export const CardContainer = styled.article<CardProps>(({ theme, backgroundColor, minHeight, padding = 'm' }) => ({
  height: '100%',
  width: '100%',
  padding: padding ? theme.padding[padding] : undefined,
  marginBottom: theme.margin.m,
  borderRadius: 10,

  background: backgroundColor || theme.rebrandingColors.palette.dark[40],
  minHeight,

  '&:last-child': {
    marginBottom: 0,
  },
}));
