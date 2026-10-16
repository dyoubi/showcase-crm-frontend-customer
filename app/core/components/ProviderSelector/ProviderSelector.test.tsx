import React from 'react';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { useGetProvidersQuery } from '@/core/domains/provider';

import { theme } from '@/themes/main';

import { ProviderSelector } from './ProviderSelector';

// Mock providers
jest.mock('@/core/domains/provider', () => ({
  useGetProvidersQuery: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    query: {},
    pathname: '',
  }),
}));

describe('ProviderSelector', () => {
  const mockProviders = [
    { id: 1, name: 'NetEnt', activate: true },
    { id: 2, name: 'Playtech', activate: true },
    { id: 3, name: 'BGaming', activate: false },
  ];

  const onFilterMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useGetProvidersQuery as jest.Mock).mockReturnValue({
      data: mockProviders,
    });
  });

  it('renders with default checked providers and calls onFilter correctly', async () => {
    render(
      <IntlProvider locale="en" messages={{}}>
        <ThemeProvider theme={theme}>
          <ProviderSelector onFilter={onFilterMock} />
        </ThemeProvider>
      </IntlProvider>,
    );

    fireEvent.click(screen.getByTestId('dropdown-container'));

    const netentCheckbox = screen.getByLabelText('NetEnt') as HTMLInputElement;
    const playtechCheckbox = screen.getByLabelText('Playtech') as HTMLInputElement;

    expect(netentCheckbox).toBeInTheDocument();
    expect(netentCheckbox.checked).toBe(true);
    expect(playtechCheckbox.checked).toBe(true);

    fireEvent.click(playtechCheckbox);
    expect(playtechCheckbox.checked).toBe(false);

    await waitFor(() => {
      expect(onFilterMock).toHaveBeenCalledWith(['netent']);
    });
  });
  it('renders only active providers ', async () => {
    render(
      <IntlProvider locale="en" messages={{}}>
        <ThemeProvider theme={theme}>
          <ProviderSelector onFilter={onFilterMock} />
        </ThemeProvider>
      </IntlProvider>,
    );

    fireEvent.click(screen.getByTestId('dropdown-container'));

    const checkbox = screen.queryByLabelText(/BGaming/i);

    expect(checkbox).not.toBeInTheDocument();
  });
});
