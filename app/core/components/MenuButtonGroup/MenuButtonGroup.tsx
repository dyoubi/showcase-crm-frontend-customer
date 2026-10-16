import { useEffect, useRef, useState } from 'react';

import { LinkButton } from '@/core/shared/Button';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';

import { ButtonContainer, ButtonIcon, MenuButton } from './MenuButtonGroup.styles';
import { ButtonInfo, MenuButtonGroupProps, SelectInfo } from './MenuButtonGroup.types';

export const MenuButtonGroup = ({
  currentPath,
  menuList,
  selectList,
  hideMobile,
  isLink = true,
  onSelect,
  selected,
}: MenuButtonGroupProps) => {
  const selectedButtonRef = useRef<HTMLAnchorElement | null>(null);
  const [isSelected, setIsSelected] = useState(selected || '');

  useEffect(() => {
    if (selectedButtonRef.current) {
      selectedButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'center',
      });
    }
  }, [currentPath]);

  const handleSelect = (selectedValue: string) => {
    setIsSelected(selectedValue);

    if (onSelect) onSelect(selectedValue);
  };

  return (
    <ButtonContainer hideOnMobile={hideMobile}>
      {isLink
        ? menuList?.map((buttonInfo: ButtonInfo) => (
            <LinkButton
              href={buttonInfo?.path || '/'}
              key={buttonInfo?.id ?? `${buttonInfo.path}-${buttonInfo.title}`}
              color={ButtonColor.Tertiary}
              iconLeft={<ButtonIcon isSelected={currentPath === buttonInfo.path} />}
              size={ButtonSize.Small}
              isSelected={currentPath === buttonInfo.path}
              ref={currentPath === buttonInfo.path ? selectedButtonRef : null}
            >
              {buttonInfo.title}
            </LinkButton>
          ))
        : selectList?.map((selectInfo: SelectInfo) => (
            <MenuButton
              key={selectInfo.value}
              color={ButtonColor.Tertiary}
              size={ButtonSize.Small}
              onClick={() => handleSelect(selectInfo.value)}
              isSelected={selectInfo.value === isSelected}
            >
              {selectInfo.label}
            </MenuButton>
          ))}
    </ButtonContainer>
  );
};
