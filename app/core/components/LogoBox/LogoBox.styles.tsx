import styled from 'styled-components';

export const LogoBoxContainer = styled.picture({
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 160,
  height: 50,
  background: '#151A24',
  boxShadow: '0px -5px 17px 2px rgba(62, 89, 176, 0.5)',
  borderRadius: '6px 6px 0px 0px',
});

export const LogoBoxWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 205,
  height: 100,
});
