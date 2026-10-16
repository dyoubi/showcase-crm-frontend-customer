import styled from 'styled-components';

export const Img = styled.img<{ selected?: boolean; focused?: boolean }>(({ selected, focused }) => ({
  display: 'block',
  maxWidth: '100%',
}));
