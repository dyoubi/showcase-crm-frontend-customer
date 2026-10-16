import styled from 'styled-components';
import Image from 'next/image';

import { mq, screen } from '@/libs/media-query';

const getTitlePartFontSize = (characters: number, smallDevice?: boolean) => {
  if (characters > 10) {
    return smallDevice ? '0.50em' : '0.60em';
  }

  if (characters > 9) {
    return smallDevice ? '0.55em' : '0.65em';
  }

  if (characters > 8) {
    return smallDevice ? '0.60em' : '0.70em';
  }

  if (characters > 7) {
    return smallDevice ? '0.65em' : '0.75em';
  }

  return smallDevice ? '0.60em' : '0.80em';
};

export const FavoriteButtonContainer = styled.div({
  zIndex: 2,
  position: 'absolute',
  bottom: '10px',
  left: '10px',
  cursor: 'pointer',
  opacity: 0,
  transition: 'opacity 0.25s',
});

export const GCContainer = styled.div<{ responsiveWidth?: boolean; disableHover?: boolean; imageLoaded?: boolean }>(
  ({ theme, disableHover, responsiveWidth, imageLoaded }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    // Maintain consistent aspect ratio for game thumbnails (160/220 ≈ 0.727)
    // Always use aspect ratio for layout stability, let parent control width
    aspectRatio: '16 / 22',
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: imageLoaded ? 'transparent' : '#f0f0f0', // Skeleton background color

    // Add skeleton loading animation
    '&::after': imageLoaded
      ? undefined
      : {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          animation: 'skeleton-loading 1.5s infinite',
          zIndex: 0,
        },

    '@keyframes skeleton-loading': {
      '0%': {
        left: '-100%',
      },
      '100%': {
        left: '100%',
      },
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      opacity: 0,
      zIndex: 1,
      width: '100%',
      height: '100%',
      backgroundImage:
        'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZl84NTFfMTAyNDQpIj4KPGNpcmNsZSBjeD0iMzkuODk4NCIgY3k9IjQwLjEwMTYiIHI9IjI3Ljg5ODQiIGZpbGw9IiMwMEQxRkYiLz4KPC9nPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMV9iZF84NTFfMTAyNDQpIj4KPGNpcmNsZSBjeD0iMzkuODk4NCIgY3k9IjQwLjEwMTYiIHI9IjI3Ljg5ODQiIGZpbGw9InVybCgjcGFpbnQwX3JhZGlhbF84NTFfMTAyNDQpIi8+CjxjaXJjbGUgY3g9IjM5Ljg5ODQiIGN5PSI0MC4xMDE2IiByPSIyNy42NDg0IiBzdHJva2U9IiMwMEQxRkYiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjwvZz4KPHBhdGggZD0iTTUwLjg0NzcgMzkuMDAzNkM1Mi4xODEgMzkuNzczNCA1Mi4xODEgNDEuNjk3OSA1MC44NDc3IDQyLjQ2NzdMMzQuOTcyNyA1MS42MzMxQzMzLjYzOTQgNTIuNDAyOSAzMS45NzI3IDUxLjQ0MDYgMzEuOTcyNyA0OS45MDFMMzEuOTcyNyAzMS41NzAyQzMxLjk3MjcgMzAuMDMwNiAzMy42Mzk0IDI5LjA2ODQgMzQuOTcyNyAyOS44MzgyTDUwLjg0NzcgMzkuMDAzNloiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2ZfODUxXzEwMjQ0IiB4PSIwIiB5PSIwLjIwMzEyNSIgd2lkdGg9Ijc5Ljc5NjkiIGhlaWdodD0iNzkuNzk2OSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI2IiByZXN1bHQ9ImVmZmVjdDFfZm9yZWdyb3VuZEJsdXJfODUxXzEwMjQ0Ii8+CjwvZmlsdGVyPgo8ZmlsdGVyIGlkPSJmaWx0ZXIxX2JkXzg1MV8xMDI0NCIgeD0iOCIgeT0iMTAuMjAzMSIgd2lkdGg9IjYzLjc5NjkiIGhlaWdodD0iNjUuNzk2OSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVHYXVzc2lhbkJsdXIgaW49IkJhY2tncm91bmRJbWFnZUZpeCIgc3RkRGV2aWF0aW9uPSIxIi8+CjxmZUNvbXBvc2l0ZSBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iZWZmZWN0MV9iYWNrZ3JvdW5kQmx1cl84NTFfMTAyNDQiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9Im91dCIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJlZmZlY3QxX2JhY2tncm91bmRCbHVyXzg1MV8xMDI0NCIgcmVzdWx0PSJlZmZlY3QyX2Ryb3BTaGFkb3dfODUxXzEwMjQ0Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0Ml9kcm9wU2hhZG93Xzg1MV8xMDI0NCIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDBfcmFkaWFsXzg1MV8xMDI0NCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgzOS44OTg0IDQwLjEwMTYpIHNjYWxlKDQ1LjY1MikiPgo8c3RvcCBvZmZzZXQ9IjAuMzQiIHN0b3AtY29sb3I9IiMwMDY2RkUiLz4KPHN0b3Agb2Zmc2V0PSIwLjc4IiBzdG9wLWNvbG9yPSIjMDBEMUZGIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==")',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      transition: 'opacity 0.25s',
    },

    '&:hover': disableHover
      ? undefined
      : {
          '&::before': {
            opacity: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            [`${mq.with({ theme }).until(screen.LG)}`]: {
              opacity: 0,
            },
          },
          '.favorite-button-container': {
            opacity: 1,
            [`${mq.with({ theme }).until(screen.LG)}`]: {
              opacity: 0,
            },
          },
        },
  }),
);

export const GCImage = styled(Image)(({ theme }) => ({
  borderRadius: '6px !important',
  transition: 'transform 0.25s ease, opacity 0.25s ease',
  display: 'block !important',
  width: '100% !important',
  height: '100% !important',
  position: 'relative',
  objectFit: 'cover',
  zIndex: 0, // Ensure image appears above skeleton loading

  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

export const GCTopLayer = styled.div(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  bottom: 25,

  [`${mq.with({ theme }).from(screen.LG)}`]: {
    bottom: 35,
  },
  boxSizing: 'border-box',
}));

export const GCTopLayerText = styled.div(({ theme }) => ({
  color: 'white',
  textAlign: 'center',
  fontWeight: 700,
  lineHeight: 1.1,
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'clamp(18px, 2vw, 22px)',
  overflow: 'hidden',
  textTransform: 'uppercase',

  [`${mq.with({ theme }).between(screen.LG, screen.XL)}`]: {
    fontSize: 'clamp(16px, 2vw, 20px)',
  },
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    fontSize: 'clamp(12px, 2vw, 14px)',
  },
}));

export const GCTopLayerTextLine = styled.div(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

export const GCTopLayerTextLinePart = styled.span<{ numChars: number }>(({ theme, numChars }) => ({
  display: 'inline-block',
  whiteSpace: 'pre',
  margin: '2px',
  fontSize: getTitlePartFontSize(numChars),

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    fontSize: getTitlePartFontSize(numChars, true),
  },
}));
