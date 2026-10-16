import { FC } from 'react';
import Link from 'next/link';

import { forwardRefWrapper } from '@/utils/forwardRefWrapper';

import { LeftElementWrapper, RightElementWrapper } from '../Button.styles';
import { ButtonSize } from '../Button.types';
import { StyledLinkButton } from './LinkButton.styles';
import { LinkButtonProps } from './LinkButton.types';

const LinkButtonWrapped: FC<LinkButtonProps> = ({
  children,
  external = false,
  forwardedRef,
  iconLeft,
  iconRight,
  openInNewTab,
  color,
  size = ButtonSize.Big,
  variant,
  isSelected,
  href,
  ...rest
}) => {
  const renderContent = () => (
    <>
      {iconLeft && <LeftElementWrapper>{iconLeft}</LeftElementWrapper>}
      {children}
      {iconRight && <RightElementWrapper>{iconRight}</RightElementWrapper>}
    </>
  );

  if (external) {
    return (
      <StyledLinkButton
        as="a"
        variant={variant}
        size={size}
        color={color}
        isSelected={isSelected}
        href={href}
        {...(external && {
          rel: 'noopener',
          target: '_blank',
        })}
        {...rest}
      >
        {renderContent()}
      </StyledLinkButton>
    );
  }

  return (
    <Link href={href} passHref>
      <StyledLinkButton size={size} variant={variant} color={color} isSelected={isSelected} {...rest}>
        {renderContent()}
      </StyledLinkButton>
    </Link>
  );
};

export const LinkButton = forwardRefWrapper<LinkButtonProps>(LinkButtonWrapped);
