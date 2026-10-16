import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';

import { useGetProvidersQuery } from '@/core/domains/provider/providerSlice';
import { routePaths } from '@/core/constants/routes';

import { theme } from '@/themes/main';

import { ProvidersCarousel } from './ProvidersCarousel';

jest.mock('@/core/domains/provider/providerSlice', () => ({
  useGetProvidersQuery: jest.fn(),
}));

jest.mock('@/core/hooks/useBreakpoints', () => ({
  useBreakpoints: jest.fn(() => ({ isTabletOrPhone: false })),
}));

jest.mock('next/link', () => ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a href={href}>{children}</a>
));

const mockProviders = [
  {
    id: 1,
    key: 'provider1',
    name: 'Provider One',
    image: { desktop: { url: 'https://example.com/image1.jpg' } },
    activate: true,
  },
  {
    id: 2,
    key: 'provider2',
    name: 'Provider Two',
    image: { desktop: { url: 'https://example.com/image2.jpg' } },
    activate: true,
  },
];

const renderComponent = () =>
  render(
    <IntlProvider locale="en" messages={{ 'carousel.providers': 'Providers' }}>
      <ThemeProvider theme={theme}>
        <ProvidersCarousel />
      </ThemeProvider>
    </IntlProvider>,
  );

describe('ProvidersCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the carousel with the correct header', () => {
    (useGetProvidersQuery as jest.Mock).mockReturnValue({ data: mockProviders });

    renderComponent();

    expect(screen.getByText('Providers')).toBeInTheDocument();
  });

  it('renders provider logos when data is available', () => {
    (useGetProvidersQuery as jest.Mock).mockReturnValue({ data: mockProviders });

    renderComponent();

    mockProviders.forEach((provider) => {
      expect(screen.findAllByAltText(provider.name)).toBeTruthy();
    });
  });

  it('wraps each provider logo in a Link with the correct href', () => {
    (useGetProvidersQuery as jest.Mock).mockReturnValue({ data: mockProviders });

    renderComponent();

    mockProviders.forEach((provider) => {
      const links = screen.getAllByRole('link', { name: provider.name });

      expect(links.some((link) => link.getAttribute('href') === `${routePaths.category}/${provider.key}`)).toBe(true);
    });
  });

  it('handles missing provider data without errors', () => {
    (useGetProvidersQuery as jest.Mock).mockReturnValue({ data: [] });

    renderComponent();

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
