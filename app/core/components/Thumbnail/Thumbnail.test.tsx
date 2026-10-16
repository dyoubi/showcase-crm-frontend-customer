import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom';

import { theme } from '@/themes/main';

import { Thumbnail } from './Thumbnail';
import { useTitleParts } from './hooks';

// Mock the FavoriteButton component
jest.mock('@/features/GamePage/components/GameFooter/FavoriteButton', () => ({
  FavoriteButton: ({ machineViewId }: { machineViewId: string }) => (
    <button data-testid="favorite-button" type="button">{`Favorite ${machineViewId}`}</button>
  ),
}));

// Mock the useTitleParts hook
jest.mock('./hooks', () => ({
  useTitleParts: jest.fn(),
}));

const renderComponent = (component: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('Thumbnail', () => {
  beforeEach(() => {
    (useTitleParts as jest.Mock).mockReturnValue({
      getTitleParts: (title: string) => ({
        lines: [{ parts: [{ key: 'part1', raw: title, length: title.length, lineIndex: 0 }] }],
      }),
    });
  });

  it('renders the title correctly', () => {
    renderComponent(<Thumbnail slug="test" src={{ desktop: 'test.jpg' }} title="Test Title" itemId="123" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the FavoriteButton when itemId is provided', () => {
    renderComponent(<Thumbnail slug="test" src={{ desktop: 'test.jpg' }} title="Test Game" itemId="game123" />);

    const favoriteButton = screen.getByTestId('favorite-button');

    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveTextContent('Favorite game123');
  });

  it('does not render the FavoriteButton when itemId is missing', () => {
    renderComponent(<Thumbnail slug="test" src={{ desktop: 'test.jpg' }} title="Test Game" />);

    expect(screen.queryByTestId('favorite-button-container')).not.toBeInTheDocument();
  });
});
