import { FC, Fragment, useState } from 'react';

import { forwardRefWrapper } from '@/utils/forwardRefWrapper';

import { RadioGroupWrapper, RadioInput, RadioLabel } from './RadioGroup.styles';
import { RadioGroupProps } from './RadioGroup.types';

const RadioGroupWrapped: FC<RadioGroupProps> = ({
  defaultValue,
  forwardedRef,
  horizontal,
  name,
  onBlur,
  onChange,
  options,
}) => {
  const [checkedValue, setCheckedValue] = useState(defaultValue);

  return (
    <RadioGroupWrapper horizontal={horizontal}>
      {options.map(({ label, value }) => (
        <Fragment key={value}>
          <RadioInput
            checked={checkedValue === value}
            ref={forwardedRef}
            id={value}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onClick={() => setCheckedValue(value)}
            type="radio"
            value={value}
          />
          <RadioLabel htmlFor={value}>{label}</RadioLabel>
        </Fragment>
      ))}
    </RadioGroupWrapper>
  );
};

export const RadioGroup = forwardRefWrapper<RadioGroupProps>(RadioGroupWrapped);
