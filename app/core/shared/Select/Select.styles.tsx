import styled from 'styled-components';
import Select from 'react-select';

import { getTypography } from '@/themes/mixins';

import { SelectProps, SelectSize } from './Select.types';
import { FieldVariant } from '../FeedbackMessage';

// Wrapper for the select component
export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// Styled label with dynamic color based on variant
export const StyledLabel = styled.label<{ variant?: FieldVariant }>`
  ${({ theme, variant }) => `
    ${getTypography(theme.typography.caption)};
    margin-bottom: ${theme.margin.xxs};
    color: ${
      variant === FieldVariant.Disabled
        ? theme.rebrandingColors.palette.light[40]
        : theme.rebrandingColors.colorsToBeDeprecated.gray[60]
    };
  `}
`;

// Styled react-select component with conditional styling
export const StyledSelect = styled(Select)<SelectProps>`
  .select__control {
    ${({ theme, size, variant, isDisabled }) => `
      min-height: ${size === SelectSize.Small ? '28px' : 'auto'};
      border-radius: 6px;
      background: ${theme.rebrandingColors.palette.dark[60]};
      box-shadow: none;
      pointer-events: ${isDisabled ? 'none' : 'unset'};
      opacity: ${variant === FieldVariant.Disabled ? 0.7 : 1};
      border-color: ${
        variant === FieldVariant.Error ? theme.rebrandingColors.colorsToBeDeprecated.red[100] : 'transparent'
      };

      &:hover {
        filter: brightness(1.3);
        color: ${theme.rebrandingColors.palette.light[20]};
      }
    `}
  }

  .select__input-container {
    ${({ size, isDisabled }) => `
      margin: ${size === SelectSize.Small ? 0 : 'auto'};
      padding: ${size === SelectSize.Small ? 0 : 'auto'};
      pointer-events: ${isDisabled ? 'none' : 'unset'};
      color: white;
    `}
  }

  .select__value-container {
    ${({ theme, size }) => `
      min-height: ${size === SelectSize.Big ? '56px' : '29px'};
      color: ${theme.rebrandingColors.palette.light[20]};
      padding: ${size === SelectSize.Small ? '0' : `calc(${theme.padding.s} - 4px)`} calc(${theme.padding.s} - 2px);
    `}
  }

  .select__single-value,
  .select__placeholder {
    ${({ theme, size, isDisabled }) => `
      color: ${theme.rebrandingColors.palette.light[40]};
      font-weight: ${size === SelectSize.Small ? 700 : 'normal'};
      ${getTypography(theme.typography.body.medium)};
      pointer-events: ${isDisabled ? 'none' : 'unset'};
      margin: 0;
    `}
  }

  .select__indicator-separator {
    display: none;
  }

  .select__indicators {
    ${({ theme, hideButton, isDisabled }) => `
      padding-right: ${theme.padding.s};

      svg * {
        stroke: ${theme.rebrandingColors.palette.light[20]};
      }

      display: ${hideButton || isDisabled ? 'none' : 'flex'};
    `}
  }

  .select__menu {
    ${({ theme, isDisabled }) => `
      z-index: 2;
      border-radius: 8px;
      background-color: ${theme.rebrandingColors.palette.dark[60]};
      pointer-events: ${isDisabled ? 'none' : 'unset'};
    `}
  }
`;

// Styled option within the dropdown with dynamic focus and selection styling
export const StyledOption = styled.div<{ isSelected: boolean; isFocused: boolean; size: SelectSize }>`
  ${({ theme, isFocused, isSelected, size }) => `
    display: flex;
    padding: ${size === SelectSize.Small ? '4px' : `${theme.padding.xs} ${theme.padding.s}`};
    color: ${theme.rebrandingColors.palette.light[20]};
    cursor: pointer;
    ${getTypography(theme.typography.button.big)};

    ${
      isSelected &&
      `
        background: ${theme.rebrandingColors.palette.light[80]};
        pointer-events: none;
      `
    }
  `}
`;

// Icon wrapper with dynamic stroke color based on focus and selection states
export const IconWrapper = styled.span<{ isSelected: boolean; isFocused: boolean }>`
  ${({ theme, isFocused, isSelected }) => `
    margin-right: 6px;
  `}
`;
