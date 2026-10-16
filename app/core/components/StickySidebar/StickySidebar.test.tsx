import React from 'react';
import { render } from '@testing-library/react';

import { StickySidebar } from './StickySidebar';

describe('StickySidebar', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <StickySidebar>
        <div>Test Content</div>
      </StickySidebar>,
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply className and style correctly', () => {
    const { container } = render(
      <StickySidebar className="test-class" style={{ color: 'red' }}>
        <div>Test Content</div>
      </StickySidebar>,
    );

    const div = container.firstChild as HTMLElement;

    expect(div).toHaveClass('test-class');
    expect(div).toHaveStyle('color: red');
  });
});
