import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import '@testing-library/jest-dom';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useGetCategoryMachinesViewsQuery } from '@/core/domains/category';

import { theme } from '@/themes/main';

import { GamesCarousel } from './GamesCarousel';

// 🛠 Mock Hooks
jest.mock('@/core/hooks/useBreakpoints', () => ({
  useBreakpoints: jest.fn(),
}));

jest.mock('@/core/domains/category', () => ({
  useGetCategoryMachinesViewsQuery: jest.fn(),
}));

jest.mock(
  'next/link',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children,
);
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

jest.mock('@/features/GamePage/components/GameFooter/FavoriteButton', () => ({
  FavoriteButton: () => <div data-testid="mock-favorite-button" />,
}));

// 🛠 Mock Data

const mockMachinesViews = [
  {
    id: 1,
    key: 'game-1',
    title: 'Game One',
    image: { desktop: { url: 'game1.jpg' }, mobile: { url: 'game1-m.jpg' } },
  },
  {
    id: 2,
    key: 'game-2',
    title: 'Game Two',
    image: { desktop: { url: 'game2.jpg' }, mobile: { url: 'game2-m.jpg' } },
  },
];

// 🛠 Utility function for rendering
const renderComponent = (breakpointMock: any) => {
  (useBreakpoints as jest.Mock).mockReturnValue(breakpointMock);
  (useGetCategoryMachinesViewsQuery as jest.Mock).mockReturnValue({ currentData: mockMachinesViews });

  render(
    <IntlProvider locale="en" messages={{}}>
      <ThemeProvider theme={theme}>
        <GamesCarousel categorySlug="slots" icon={<span>🔥</span>} />
      </ThemeProvider>
    </IntlProvider>,
  );
};

describe('GamesCarousel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with games', () => {
    renderComponent({ isPhone: false, isTabletOrPhone: false, isDesktop: true });

    expect(screen.getByText('Slots')).toBeInTheDocument();
    expect(screen.findAllByText('One')).toBeTruthy();
    expect(screen.findAllByText('Two')).toBeTruthy();
  });
});
