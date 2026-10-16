import { FC, useCallback, useEffect, useState } from 'react';

import { IconChevronDown, IconLoader } from '@/core/shared/Icons';

import { getVariant } from '@/utils/helpers';

import { IconWrapper, SelectWrapper, StyledLabel, StyledOption, StyledSelect } from './Select.styles';
import { OptionProps, SelectProps, SelectSize } from './Select.types';
import { FeedbackMessage, FieldVariant } from '../FeedbackMessage';

const CustomOption: FC<OptionProps> = ({ children, data, innerProps, isDisabled, isFocused, isSelected, size }) => {
  if (isDisabled) return null;

  return (
    <StyledOption isSelected={isSelected} isFocused={isFocused} size={size} {...innerProps}>
      {data?.icon && (
        <IconWrapper isSelected={isSelected} isFocused={isFocused}>
          {data.icon}
        </IconWrapper>
      )}
      {children}
    </StyledOption>
  );
};

const LoadingIndicator = () => <IconLoader />;

export const Select: FC<SelectProps> = ({
  caption,
  className,
  defaultMenuIsOpen,
  defaultValue,
  isSearchable = true,
  error,
  filterOption,
  formatOptionLabel,
  hideButton = false,
  inputRef,
  isDisabled,
  isLoading,
  isValid,
  label,
  menuIsOpen,
  name,
  onBlur,
  onChange,
  onInputChange,
  options,
  placeholder,
  size = SelectSize.Big,
  value,
  customIndicator,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate stable ID only on client side to prevent hydration mismatch
  const id = isClient
    ? `select-${name || 'default'}-${Math.random().toString(36).substring(2, 9)}`
    : `select-${name || 'default'}-server`;

  const variant = getVariant<FieldVariant>({
    [FieldVariant.Disabled]: !!isDisabled,
    [FieldVariant.Error]: !!error,
    [FieldVariant.Valid]: !!isValid,
    [FieldVariant.Default]: true,
  });

  const DropdownIndicator = useCallback(() => customIndicator || <IconChevronDown />, [size]);

  const Option = useCallback((props: any) => <CustomOption size={size} {...props} />, [size]);

  return (
    <SelectWrapper>
      {label && (
        <StyledLabel htmlFor={id} variant={variant}>
          {label}
        </StyledLabel>
      )}
      <StyledSelect
        className={className}
        classNamePrefix="select"
        components={{ DropdownIndicator, LoadingIndicator, Option }}
        defaultMenuIsOpen={defaultMenuIsOpen}
        defaultValue={defaultValue}
        isSearchable={isSearchable}
        filterOption={filterOption}
        formatOptionLabel={formatOptionLabel}
        hideButton={hideButton}
        id={id}
        isDisabled={isLoading || isDisabled}
        isLoading={isLoading}
        label={label}
        menuIsOpen={menuIsOpen}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onInputChange={onInputChange}
        options={options}
        placeholder={placeholder}
        ref={inputRef}
        size={size}
        value={value}
        variant={variant}
      />
      {(caption || error) && <FeedbackMessage variant={variant}>{error || caption}</FeedbackMessage>}
    </SelectWrapper>
  );
};
