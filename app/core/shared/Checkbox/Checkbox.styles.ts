import styled from 'styled-components';

export const CheckboxContainer = styled.div<{ error?: boolean }>(({ theme, error }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  marginRight: '8px',
  border: `1px solid ${error ? theme.rebrandingColors.colorVariants.danger : theme.rebrandingColors.palette.light[40]}`,
  borderRadius: '3px',
  background: 'transparent',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
}));

export const StyledLabel = styled.label<{
  disabled?: boolean;
  error?: boolean;
  isOutlined?: boolean;
}>(({ theme, disabled, error }) => ({
  display: 'inline-flex',
  alignItems: 'flex-start',
  width: '90%',
  fontSize: theme.typography.body.small.fontSize,
  color: theme.rebrandingColors.palette.light[40],
  ...(disabled
    ? {
        cursor: 'default',
      }
    : {
        cursor: 'pointer',
      }),
}));

export const HiddenInput = styled.input<{
  isOutlined?: boolean;
}>(({ theme, isOutlined }) => ({
  opacity: 0,
  margin: 0,
  height: 24,
  width: 24,
  border: 'none',
  transition: 'all 0.2s ease-in-out',

  background: isOutlined ? 'transparent' : theme.rebrandingColors.gradients.blue,

  '&:focus-visible': {
    '& + label::before': {
      outline: `${theme.rebrandingColors.gradients.blue} auto 2px`,
    },
  },

  '&:checked': {
    opacity: 1,
    transform: 'rotate(360deg)',
  },
}));

export const CheckboxWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
