import { useEffect, useRef, useState } from 'react';

import { useToggle } from '@/core/hooks/useToggle';

import * as S from './Dropdown.styles';
import { DropdownProps } from './Dropdown.types';

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  content,
  zIndex,
  className = '',
  disabled = false,
  contentPosition = 'center',
  isClosed = false,
  toggleOnSelection = true,
  fullWidth = false,
  isOpenByDefault,
  onToggle,
  toggleOnClickOutside = true,
}) => {
  const [isOpen, toggle] = useToggle(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasOpenedByDefaultRef = useRef(false);

  const toggleDropdown = () => {
    if (!disabled) {
      if (onToggle) {
        onToggle(!isOpen);
      }
      toggle();
    }
  };

  const handleSelection = () => {
    if (toggleOnSelection) {
      toggleDropdown();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!toggleOnClickOutside) {
      return;
    }

    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      toggleDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      toggle();
    }
  }, [isClosed]);

  useEffect(() => {
    if (!hasOpenedByDefaultRef.current && isOpenByDefault) {
      toggle();
      hasOpenedByDefaultRef.current = true;
    }
  }, []);

  return (
    <S.DropdownWrapper ref={wrapperRef} className={className} style={{ zIndex }} fullWidth={fullWidth}>
      <S.DropdownButton onClick={toggleDropdown} open={isOpen} data-testid="dropdown-button" fullWidth={fullWidth}>
        {children}
      </S.DropdownButton>
      <S.DropdownContent isOpen={isOpen} position={contentPosition} onClick={handleSelection} fullWidth={fullWidth}>
        {content}
      </S.DropdownContent>
    </S.DropdownWrapper>
  );
};

export * from './DropdownMenu';
export * from './DropdownItem';
export * from './DropdownContainer';
