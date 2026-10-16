import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { PromotionBox } from './PromotionBox';

jest.mock('next/link', () => ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} data-testid="promotion-link">
    {children}
  </a>
));

const renderComponent = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('PromotionBox', () => {
  it('renders the image correctly', () => {
    const src = 'https://example.com/image.jpg';
    const link = '/promo';

    renderComponent(<PromotionBox src={src} link={link} onClick={jest.fn()} />);

    const image = screen.getByTestId('promotion-image-with-link');

    expect(image).toHaveAttribute('src', src);
  });

  it('calls the onClick function when the image is clicked', () => {
    const onClick = jest.fn();
    const src = 'https://example.com/image.jpg';

    renderComponent(<PromotionBox src={src} onClick={onClick} />);

    const image = screen.getByTestId('promotion-image');

    fireEvent.click(image);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders the Link component when the link prop is provided', () => {
    const link = '/promo';
    const src = 'https://example.com/image.jpg';

    renderComponent(<PromotionBox src={src} link={link} onClick={jest.fn()} />);

    const linkElement = screen.getByTestId('promotion-link');

    expect(linkElement).toHaveAttribute('href', link);
  });

  it('does not render Link component when link prop is not provided', () => {
    const src = 'https://example.com/image.jpg';

    renderComponent(<PromotionBox src={src} link="" onClick={jest.fn()} />);

    const image = screen.getByTestId('promotion-image');

    expect(image).toBeInTheDocument();
    expect(image.closest('a')).toBeNull();
  });
});
