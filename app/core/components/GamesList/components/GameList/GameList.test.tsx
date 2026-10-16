import { IntlProvider } from 'react-intl';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { routePaths } from '@/core/constants/routes';
import { MachineView } from '@/core/domains/machineView';

import { theme } from '@/themes/main';

import { GameList } from './GameList';

const mockGames: Array<MachineView> = Array.from({ length: 20 }, (_, index) => ({
  id: `game-${index + 1}`,
  key: `game-key-${index + 1}`,
  title: `Game${index + 1}`,
  activate: true,
  casinoId: `casino-${index + 1}`,
  description: `Description for Game ${index + 1}`,
  operatorId: `operator-${index + 1}`,
  createdAt: new Date(),
  image: {
    desktop: { url: `https://example.com/game-${index + 1}-desktop.jpg` },
    mobile: { url: `https://example.com/game-${index + 1}-mobile.jpg` },
  },
}));

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

jest.mock('@/features/GamePage/components/GameFooter/FavoriteButton', () => ({
  FavoriteButton: () => <div data-testid="mock-favorite-button" />,
}));

const renderComponent = (data: Array<MachineView> = mockGames) => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>
        <GameList data={data} />
      </ThemeProvider>
    </IntlProvider>,
  );
};

describe('GameList Component', () => {
  test('renders the initial set of games correctly', () => {
    renderComponent();

    mockGames.slice(0, 18).forEach((game) => {
      expect(screen.getByText(game.title)).toBeInTheDocument();
    });

    expect(screen.getByText(/Load More/i)).toBeInTheDocument();
  });

  test('clicking Load More displays additional games', () => {
    renderComponent();

    const loadMoreButton = screen.getByText(/Load More/i);

    fireEvent.click(loadMoreButton);

    mockGames.forEach((game) => {
      expect(screen.getByText(game.title)).toBeInTheDocument();
    });
  });

  test('hides Load More button when all games are displayed', () => {
    renderComponent(mockGames.slice(0, 5)); // Only 5 games

    expect(screen.queryByText(/Load More/i)).not.toBeInTheDocument();
  });

  test('each game has the correct link', () => {
    renderComponent();

    mockGames.slice(0, 18).forEach((game) => {
      const gameLink = screen.getByText(game.title).closest('a');

      expect(gameLink).toHaveAttribute('href', `${routePaths.game}/${game.key}`);
    });
  });
});
