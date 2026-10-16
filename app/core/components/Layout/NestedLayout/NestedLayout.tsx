import { Box } from '@/core/shared';

import { PageMenu } from '../../PageMenu';
import { ContentContainer } from '../Layout.styles';
import { RightContainer, StyledHeading } from './NestedLayout.styles';
import { NestedLayoutProps } from './NestedLayout.types';

export const NestedLayout = ({ children, title, menuItems, hasDropdownMenu = false }: NestedLayoutProps) => {
  return (
    <ContentContainer>
      <Box mb="m">
        <StyledHeading size="h1">{title}</StyledHeading>
      </Box>

      <PageMenu menuItems={menuItems} isDropdown={hasDropdownMenu} />

      <RightContainer>{children}</RightContainer>
    </ContentContainer>
  );
};
