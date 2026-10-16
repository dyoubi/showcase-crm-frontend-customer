import styled from 'styled-components';

import { Theme } from '@/themes/themes';

import { Box } from '../Box';
import { NotificationType } from './Notification.types';

import { mq, screen } from '@/libs/media-query';

const getVariantBgStyle = (variant: NotificationType) => {
  switch (variant) {
    case 'error':
      return {
        opacity: 0.3,
        background: 'linear-gradient(92deg, #FF015C 1.59%, rgba(21, 15, 48, 0.00) 98.41%)',
      };
    case 'success':
      return {
        opacity: 0.3,
        background: 'linear-gradient(92deg, #33FF00 1.59%, rgba(21, 15, 48, 0.00) 98.41%)',
      };
    case 'warning':
      return {
        opacity: 0.3,
        background: 'linear-gradient(92deg, #F8D102 1.59%, rgba(21, 15, 48, 0.00) 98.41%)',
      };
    default:
      return {
        opacity: 0.3,
        background: 'linear-gradient(92deg, #0166FF 1.59%, rgba(21, 15, 48, 0.00) 98.41%)',
      };
  }
};

const getVariantProgressStyle = (variant: NotificationType, theme: Theme): string => {
  switch (variant) {
    case 'error':
      return theme.rebrandingColors.gradients.red;
    case 'success':
      return theme.rebrandingColors.gradients.green;
    case 'warning':
      return theme.rebrandingColors.gradients.yellow;
    default:
      return theme.rebrandingColors.gradients.blue;
  }
};

const getVariantIconBgStyle = (variant: NotificationType) => {
  switch (variant) {
    case 'error':
      return {
        background: 'linear-gradient(108deg, #FF005C 23.56%, #FF307B 98.58%)',
      };
    case 'success':
      return {
        background: 'linear-gradient(104deg, #3F0 19.6%, #CF0 93.91%)',
      };
    case 'warning':
      return {
        background: 'linear-gradient(107deg, #F8D102 22.31%, #FFFA7E 127.81%)',
      };
    default:
      return {
        background: 'linear-gradient(109deg, #0066FE 24.94%, #00D1FF 97.1%)',
      };
  }
};

export const NotificationContextContainer = styled.div(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.zIndexes.modal + 1,
  top: 64,
  left: 0,
  right: 0,
  width: '66%',
  margin: '0 auto',
}));

export const NotificationContainer = styled(Box)`
  transition: transform 0.3s ease-in;
  animation: slide-in 0.5s;

  @keyframes slide-in {
    from {
      opacity: 0%;
    }

    to {
      opacity: 100%;
    }
  }
`;

export const NotificationBox = styled.div<{ variant: NotificationType }>(({ theme, variant }) => ({
  position: 'fixed',
  top: theme.margin.m,
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 320,
  minHeight: 80,
  padding: theme.padding.m,

  borderRadius: 10,
  background: theme.rebrandingColors.palette.dark[20],
  transform: 'translateX(-50%)',
  color: theme.rebrandingColors.palette.light[20],

  [`${mq.with({ theme }).from(screen.LG)}`]: {
    right: theme.margin.m,
    left: 'auto',
    transform: 'translateX(0)',
  },

  '.bg-layer': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    ...getVariantBgStyle(variant),
    zIndex: -1,
  },
}));

export const ContentWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  lineHeight: '24px',
  alignItems: 'center',
  justifyContent: 'center',
});

export const IconBox = styled(Box)<{ variant: NotificationType }>(({ theme, variant }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.padding.m,
  minWidth: 30,
  height: 30,
  borderRadius: 6,
  ...getVariantIconBgStyle(variant),
}));

export const ChildrenWrapper = styled.div({
  display: 'block',
  flexGrow: 1,
  whiteSpace: 'pre-line',
  fontSize: 14,
});

export const Title = styled.h4({
  margin: 0,
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
});

export const Content = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: '12px',
  lineHeight: '18px',
  color: theme.rebrandingColors.palette.gray[20],
}));

export const CloseButton = styled.button(({ theme }) => ({
  display: 'flex',

  margin: 0,
  padding: 0,
  paddingLeft: theme.padding.m,

  border: 'none',
  background: 'none',

  cursor: 'pointer',
}));

export const ProgressBarWrapper = styled.div({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '4px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',
  overflow: 'hidden',
});

export const ProgressBar = styled.div<{ duration: number; variant: NotificationType }>`
  height: 100%;
  width: 100%;
  background: ${({ variant, theme }) => getVariantProgressStyle(variant, theme)};
  animation: decreaseWidth ${({ duration }) => duration}ms linear forwards;
  border-radius: 0px 20px 20px 0px;
  @keyframes decreaseWidth {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;
