import React from 'react';

import { fireEvent, render, screen } from '@/utils/testHelpers';

import { Tag } from './Tag';

describe('Tag', () => {
  const content = 'Test Tag';
  const color = 'blue';
  const onTagClick = jest.fn();

  it('renders the Tag component with content', () => {
    render(<Tag content={content} color={color} onTagClick={onTagClick} />);
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('applies the correct color', () => {
    render(<Tag content={content} color={color} onTagClick={onTagClick} />);
    expect(screen.getByText(content)).toHaveStyle(`background: ${color}`);
  });

  it('calls onTagClick when clicked', () => {
    render(<Tag content={content} color={color} onTagClick={onTagClick} />);
    fireEvent.click(screen.getByText(content));
    expect(onTagClick).toHaveBeenCalledTimes(1);
  });
});
