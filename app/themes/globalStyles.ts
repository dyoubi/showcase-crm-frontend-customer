import { createGlobalStyle } from 'styled-components';

import { Theme } from './themes';

import { mq, screen } from '@/libs/media-query';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.rebrandingColors.palette.dark[20]};
    color: ${({ theme }) => theme.rebrandingColors.palette.light[20]};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.body.medium.fontSize};
    line-height: ${({ theme }) => theme.typography.body.medium.lineHeight};

    a {
      color: ${({ theme }) => theme.rebrandingColors.palette.light[20]};
      text-decoration: none;
    }
  }

  .displayMocked [data-mocked] {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border: solid 2px red;
      background: rgba(255, 0, 0, .6);
      pointer-events: none;

      /* z-index: 1000; */
    }
  }


  .hide-sm {
    ${({ theme }) => mq.with({ theme }).until(screen.SM)`
      display: none !important;  
    `}
  }

  .hide-md {
    ${({ theme }) => mq.with({ theme }).until(screen.MD)`
      display: none !important;  
    `}
  }

  .hide-lg {
    ${({ theme }) => mq.with({ theme }).until(screen.LG)`
      display: none !important;  
    `}
  }

  .hide-xl {
    ${({ theme }) => mq.with({ theme }).until(screen.XL)`
      display: none !important;  
    `}
  }


  .hide-desktop {
    ${({ theme }) => mq.with({ theme }).from(screen.LG)`
      display: none !important;  
    `}
  }

`;
