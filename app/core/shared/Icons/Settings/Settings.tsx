import React from 'react';

import { useIconColor, useIconSize } from '../hooks';
import * as t from '../types';

export const IconSettings = React.memo(({ color, size, ...rest }: t.IconProps) => {
  const iconColor = useIconColor(color);
  const iconSize = useIconSize(size);

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 37 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M18.1629 23.3353C21.1079 23.3353 23.4953 20.948 23.4953 18.003C23.4953 15.058 21.1079 12.6707 18.1629 12.6707C15.2179 12.6707 12.8306 15.058 12.8306 18.003C12.8306 20.948 15.2179 23.3353 18.1629 23.3353Z"
        stroke={color ? iconColor : 'currentColor'}
        strokeWidth="3.5"
        strokeMiterlimit="10"
      />
      <path
        d="M34.3318 22.3044L30.7176 20.2188C30.848 19.496 30.9191 18.7554 30.9191 17.997C30.9191 17.1735 30.8302 16.3736 30.6821 15.5916L33.9763 13.6897L29.7104 6.30143L26.3688 8.23292C25.2016 7.2494 23.8626 6.4614 22.3873 5.94594V2H13.8556V5.94594C12.404 6.4614 11.0709 7.23755 9.90965 8.20922L6.62137 6.30735L2.35549 13.6956L5.56675 15.5501C5.40678 16.344 5.32383 17.1616 5.32383 17.997C5.32383 18.7732 5.40085 19.5256 5.5312 20.2662L2 22.3044L6.26588 29.6927L9.76745 27.6723C10.9583 28.7032 12.3448 29.5149 13.8615 30.0541V34H22.3933V30.0541C23.9219 29.5149 25.3201 28.6854 26.5229 27.6427L30.0718 29.6927L34.3377 22.3044H34.3318Z"
        stroke={color ? iconColor : 'currentColor'}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
