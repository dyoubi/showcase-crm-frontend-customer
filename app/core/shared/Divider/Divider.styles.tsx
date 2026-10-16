import styled from 'styled-components';

import { DividerProps } from './Divider.types';

export const StyledDivider = styled.hr<DividerProps>(({ theme, center, width, m, mt, mb }) => ({
  width,
  height: 1,
  borderColor: theme.rebrandingColors.palette.light[20],
  borderWidth: '1px 0 0',

  margin: m ? theme.margin[m] : 0,
  marginTop: mt && theme.margin[mt],
  marginRight: center ? 'auto' : 0,
  marginBottom: mb && theme.margin[mb],
  marginLeft: center ? 'auto' : 0,
}));
