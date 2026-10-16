import { FC } from 'react';

import { Card, Flex } from '@/core/shared';
import { IconMore } from '@/core/shared/Icons';

import { WidgetProps } from './Widget.types';
import { Container, Title } from './Widget.styles';

// @DEPRECATED
export const Widget: FC<WidgetProps> = ({ header, backgroundColor, children, hasMoreButton, moreButtonOnClick }) => {
  return (
    <Card backgroundColor={backgroundColor}>
      {header ? (
        <Flex flexDirection="row" justifyContent="space-between">
          <Title>{header}</Title>

          {hasMoreButton ? <IconMore onClick={moreButtonOnClick} /> : null}
        </Flex>
      ) : null}

      <Container>{children}</Container>
    </Card>
  );
};
