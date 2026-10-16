import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTheme } from 'styled-components';

import * as S from './styles';
import * as t from './types';

export const Tooltip = forwardRef<t.TooltipRef, t.TooltipProps>(
  (
    {
      displayOn = 'mouseenter',
      message,
      children,
      visible,
      hideOnClick = true,
      position = 'top',
      onShow,
      onHide,
      zIndex,
      className,
    },
    ref,
  ) => {
    // hooks
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(visible);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      show: () => setIsVisible(true),
      hide: () => setIsVisible(false),
    }));

    useEffect(() => {
      if (isVisible && onShow) onShow();

      if (!isVisible && onHide) onHide();
    }, [isVisible, onShow, onHide]);

    const handleMouseEnter = () => {
      if (displayOn === 'mouseenter' || displayOn === 'mouseenter focus') {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      if (displayOn === 'mouseenter' || displayOn === 'mouseenter focus') {
        setIsVisible(false);
      }
    };

    const handleClick = () => {
      if (hideOnClick) {
        setIsVisible(false);
      }

      if (displayOn === 'click') {
        setIsVisible(!isVisible);
      }
    };

    return (
      <S.Wrapper
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
        {isVisible && (
          <S.Tooltip
            ref={tooltipRef}
            position={position}
            zIndex={zIndex || theme.zIndexes.tooltip}
            displayOn={displayOn}
          >
            {message}
          </S.Tooltip>
        )}
      </S.Wrapper>
    );
  },
);

export const useTooltipRef = () => useRef<t.TooltipRef>(null);
export type TooltipProps = t.TooltipProps;
