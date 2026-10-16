import { FC, useState } from 'react';

import { AccordionContent, AccordionContentContainer } from './Accordion.styles';
import { AccordionProps, AccordionVariant } from './Accordion.types';
import { AccordionHeader } from './AccordionHeader/AccordionHeader';

export const Accordion: FC<AccordionProps> = ({
  children,
  iconLeft,
  isOpenByDefault = false,
  renderHeader,
  title,
  variant = AccordionVariant.Default,
}) => {
  const [isExpanded, setIsExpanded] = useState(isOpenByDefault);

  const handleOnClick = () => setIsExpanded(!isExpanded);

  return (
    <>
      {typeof renderHeader === 'function' ? (
        renderHeader({
          isExpanded,
          onClick: handleOnClick,
        })
      ) : (
        <AccordionHeader
          aria-expanded={isExpanded}
          data-testid="accordion-header"
          iconLeft={iconLeft}
          isActive={isExpanded}
          onClick={handleOnClick}
          title={title}
          variant={variant}
        />
      )}
      {variant === AccordionVariant.Simple || renderHeader ? (
        <AccordionContentContainer isExpanded={isExpanded} data-testid="accordion-content">
          {children}
        </AccordionContentContainer>
      ) : (
        <AccordionContent isExpanded={isExpanded} data-testid="accordion-content">
          {children}
        </AccordionContent>
      )}
    </>
  );
};
