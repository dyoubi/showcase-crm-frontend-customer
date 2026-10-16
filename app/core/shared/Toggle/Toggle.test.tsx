import React from 'react';

import { fireEvent, render, screen } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { Toggle } from './Toggle';

describe('Toggle Component', () => {
  const mockOnSelect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all labels correctly', () => {
    const labels = ['Option 1', 'Option 2', 'Option 3'];

    render(<Toggle labels={labels} onSelect={mockOnSelect} activeIndex={0} />);

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('sets the correct button as active initially', () => {
    const labels = ['Option 1', 'Option 2', 'Option 3'];

    render(<Toggle labels={labels} onSelect={mockOnSelect} activeIndex={1} />);

    const activeButton = screen.getByText('Option 2');

    expect(activeButton).toHaveStyleRule('background', theme.rebrandingColors.gradients.blue);
  });

  it('calls onSelect with the correct index when a button is clicked', () => {
    const labels = ['Option 1', 'Option 2', 'Option 3'];

    render(<Toggle labels={labels} onSelect={mockOnSelect} activeIndex={0} />);

    const thirdButton = screen.getByText('Option 3');

    fireEvent.click(thirdButton);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect.mock.calls[0][0]).toBe(2);
  });
});
