import styled from 'styled-components';

import { Thumbnail } from '../Thumbnail';

export const VoidThumbNail = styled(Thumbnail)(({ theme }) => ({
  '&::before': { display: 'none' },

  '&:hover': {},
  '&>*': { opacity: 0 },
}));
