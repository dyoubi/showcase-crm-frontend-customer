import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import '@testing-library/jest-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { useGetPlayerBonusesQuery } from '@/core/domains/bonus';
import { routePaths } from '@/core/constants/routes';

import { theme } from '@/themes/main';

import { VIPModal } from './VIPModal';

// Mocks for useAppDispatch and useAppSelector
jest.mock('@/core/store/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mocking the useGetPlayerBonusesQuery hook
jest.mock('@/core/domains/bonus', () => ({
  useGetPlayerBonusesQuery: jest.fn(),
  selectLatestBonus: jest.fn(),
}));

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

const renderComponent = (component: React.ReactNode) => {
  return render(
    <SessionProvider session={null}>
      <IntlProvider locale="en">
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </IntlProvider>
    </SessionProvider>,
  );
};

describe('VIPModal', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useAppSelector as jest.Mock).mockReturnValue(true); // Assuming modal is closed initially
    (useGetPlayerBonusesQuery as jest.Mock).mockReturnValue({
      data: [],
      refetch: jest.fn(),
    });
  });

  it('renders VIP modal and tabs correctly', async () => {
    renderComponent(<VIPModal />);

    // Ensure VIP Modal is rendered
    expect(screen.findAllByText('VIP')).toBeTruthy();
    expect(screen.getByText('Benefits')).toBeInTheDocument();
    expect(screen.getByText('Reload')).toBeInTheDocument();
  });

  it('renders the correct "Learn more" link', () => {
    renderComponent(<VIPModal />);

    const learnMoreLink = screen.getByText('Learn more about our VIP program');

    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink.closest('a')).toHaveAttribute('href', routePaths.vip.en);
  });
});
