import { FC } from 'react';

import { StyledDivider } from './Divider.styles';
import { DividerProps } from './Divider.types';

export const Divider: FC<DividerProps> = ({ width = '100%', center = false, m, mt, mb }) => (
  <StyledDivider center={center} width={width} m={m} mt={mt} mb={mb} />
);
