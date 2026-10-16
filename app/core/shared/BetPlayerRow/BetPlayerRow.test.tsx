import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';

import { BetType } from '@/core/domains/bet';
import { CryptoCodes } from '@/core/domains/currency/types';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useTheme } from '@/core/hooks/useTheme';

import { theme } from '@/themes/main';

import { BetPlayerRow, Props } from './BetPlayerRow';

jest.mock('@/core/hooks/useBreakpoints', () => ({
  useBreakpoints: jest.fn(),
}));

jest.mock('@/utils/date', () => ({
  formatDateString: jest.fn((date) => `formatted-${date}`),
}));

const mockedUseBreakpoints = useBreakpoints as jest.MockedFunction<typeof useBreakpoints>;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({
  locale: 'en',
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
});

jest.mock('@/core/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

(useTheme as jest.Mock).mockReturnValue({
  theme: {
    rebrandingColors: {
      palette: {
        green: {
          20: '#00FF00', // Mocked color value
        },
      },
    },
  },
});

describe('BetPlayerRow', () => {
  const renderComponent = (props: Props) => {
    return render(
      <ThemeProvider theme={theme}>
        <IntlProvider locale="en">
          <table>
            <tbody>
              <BetPlayerRow {...props} />
            </tbody>
          </table>
        </IntlProvider>
      </ThemeProvider>,
    );
  };

  it('renders the bet details correctly', () => {
    mockedUseBreakpoints.mockReturnValue({
      device: 'DESKTOP',
      isDesktop: true,
      isPhone: false,
      isTablet: false,
      isTabletOrPhone: false,
      isWidescreen: true,
    });

    renderComponent({
      type: 'win' as BetType,
      amount: '100',
      machineTitle: 'Lucky Spin',
      date: '2024-03-28',
      coin: 'BTC' as CryptoCodes,
    });

    expect(screen.getByText('Lucky Spin')).toBeInTheDocument();
    expect(screen.getByText('formatted-2024-03-28')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('win')).toBeInTheDocument();
  });

  it('hides date on mobile', () => {
    mockedUseBreakpoints.mockReturnValue({
      device: 'DESKTOP',
      isDesktop: false,
      isPhone: true,
      isTablet: true,
      isTabletOrPhone: true,
      isWidescreen: false,
    });

    renderComponent({
      type: 'loss' as BetType,
      amount: '50',
      machineTitle: 'Mega Slots',
      date: '2024-03-28',
      coin: 'ETH' as CryptoCodes,
    });

    expect(screen.queryByText('formatted-2024-03-28')).not.toBeInTheDocument();
  });
});
