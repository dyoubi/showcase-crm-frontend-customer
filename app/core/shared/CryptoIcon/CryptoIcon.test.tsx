import { render, screen } from '@testing-library/react';

import { CryptoIcon } from './CryptoIcon';

jest.mock('@/core/shared/Icons', () => ({
  IconBitcoin: jest.fn(() => <div data-testid="icon-bitcoin" />),
  IconEthereum: jest.fn(() => <div data-testid="icon-ethereum" />),
  IconTron: jest.fn(() => <div data-testid="icon-tron" />),
}));

describe('CryptoIcon Component', () => {
  it('renders the Bitcoin icon when the symbol is "BTC"', () => {
    render(<CryptoIcon code="BTC" />);

    expect(screen.getByTestId('icon-bitcoin')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-ethereum')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon-tron')).not.toBeInTheDocument();
  });

  it('renders the Ethereum icon when the symbol is "ETH"', () => {
    render(<CryptoIcon code="ETH" />);

    expect(screen.getByTestId('icon-ethereum')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-bitcoin')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon-tron')).not.toBeInTheDocument();
  });

  it('renders the Tron icon when the symbol is "TRX"', () => {
    render(<CryptoIcon code="TRX" />);

    expect(screen.getByTestId('icon-tron')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-bitcoin')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon-ethereum')).not.toBeInTheDocument();
  });

  it('renders nothing when no symbol is provided', () => {
    render(<CryptoIcon code={undefined} />);

    expect(screen.queryByTestId('icon-bitcoin')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon-ethereum')).not.toBeInTheDocument();
    expect(screen.queryByTestId('icon-tron')).not.toBeInTheDocument();
  });
});
