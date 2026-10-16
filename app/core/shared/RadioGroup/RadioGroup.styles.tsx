import styled from 'styled-components';

export const RadioGroupWrapper = styled.div<{
  horizontal?: boolean;
}>(({ horizontal }) => ({
  display: 'flex',
  flexDirection: horizontal ? 'row' : 'column',

  ...(horizontal
    ? {
        flexWrap: 'wrap',
      }
    : {}),
}));

export const RadioLabel = styled.label(({ theme }) => ({
  position: 'relative',
  marginRight: theme.margin.xs,
  paddingTop: theme.padding.xs,
  paddingRight: theme.padding.xs,
  paddingLeft: theme.padding.xl,
  paddingBottom: theme.padding.xs,
  border: '1px solid transparent',
  color: theme.rebrandingColors.colorsToBeDeprecated.gray[60],
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 13,
    left: 0,
    width: 20,
    height: 20,
    background: theme.rebrandingColors.gradients.blue,
    border: '1px solid transparent',
    backgroundOrigin: 'border-box',
    backgroundClip: 'border-box',
    boxShadow: `inset 0 0 0 1000px ${theme.rebrandingColors.palette.dark[60]}`,
    borderRadius: '100%',
    transition: 'all 0.2s ease-in-out',
  },
}));

export const RadioInput = styled.input({
  position: 'absolute',
  width: 0,
  height: 0,
  display: 'none',

  '&:checked + label': {
    '&::before': {
      borderWidth: 6,
    },
  },
});
