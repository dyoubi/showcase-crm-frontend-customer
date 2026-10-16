import { StyledTag } from './Tag.styles';
import { TagProps } from './Tag.types';

export const Tag = ({ content, color, onTagClick }: TagProps) => (
  <StyledTag color={color} onClick={onTagClick}>
    {content}
  </StyledTag>
);
