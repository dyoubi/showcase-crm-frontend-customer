import { FC } from 'react';

import { StyledTable, TableScrollable } from './Table.styles';
import { TableProps } from './Table.types';

export const Table: FC<TableProps> = ({ children, minWidth = 0, maxHeight, ...props }) => (
  <TableScrollable maxHeight={maxHeight}>
    <StyledTable minWidth={minWidth} {...props}>
      {children}
    </StyledTable>
  </TableScrollable>
);
