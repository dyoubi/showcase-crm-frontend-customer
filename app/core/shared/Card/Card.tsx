import { FC } from 'react';

import { CardProps } from './Card.types';
import { CardContainer } from './Card.styles';

export const Card: FC<CardProps> = (props) => {
  const { children, backgroundColor, minHeight, padding } = props;

  return (
    <CardContainer backgroundColor={backgroundColor} minHeight={minHeight} padding={padding}>
      {children}
    </CardContainer>
  );
};
