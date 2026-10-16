import styled from 'styled-components';

export const Tooltip = styled.div<{ position: string; zIndex: number; displayOn: string }>`
  position: absolute;
  z-index: ${({ zIndex }) => zIndex};
  background-color: ${({ theme }) => theme.rebrandingColors.palette.dark[60]};
  color: ${({ theme }) => theme.rebrandingColors.palette.light[20]};
  box-shadow: 0 4px 20px 1px rgb(0 0 0 / 6%), 0 1px 4px rgb(0 0 0 / 8%);
  border-radius: 8px;
  white-space: nowrap;

  ${({ displayOn, theme }) =>
    displayOn !== 'click' &&
    `
    padding: ${theme.padding.xxs} ${theme.padding.m};
  `}

  ${({ position }) =>
    position === 'top' &&
    `
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
  `}

  ${({ position }) =>
    position === 'right' &&
    `
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    margin-left: 8px;
  `}

  ${({ position }) =>
    position === 'bottom' &&
    `
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
  `}

  ${({ position }) =>
    position === 'left' &&
    `
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    margin-right: 8px;
  `}
`;

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;
