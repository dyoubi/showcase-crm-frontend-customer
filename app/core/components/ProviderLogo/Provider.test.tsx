import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { ProviderLogo } from './Provider';

jest.mock(
  'next/image',
  () =>
    ({ src, alt, height, width }: { src: string; alt: string; height: number; width: number }) =>
      <img src={src} alt={alt} height={height} width={width} data-testid="provider-image" />,
);

const renderComponent = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ProviderLogo', () => {
  it('renders the image when the image prop is provided', () => {
    const image = 'https://example.com/logo.jpg';
    const name = 'Example Provider';

    renderComponent(<ProviderLogo image={image} name={name} />);

    // Check if the image is rendered with the correct src and alt
    const img = screen.getByAltText(name);

    expect(img).toHaveAttribute('src', image);
    expect(img).toHaveAttribute('alt', name);
  });

  it('does not render the image if the image prop is not provided', () => {
    renderComponent(<ProviderLogo image={undefined} name="Example Provider" />);

    const img = screen.queryByTestId('provider-image');

    expect(img).not.toBeInTheDocument();
  });

  it('sets the alt text correctly when the name prop is provided', () => {
    const image = 'https://example.com/logo.jpg';
    const name = 'Example Provider';

    renderComponent(<ProviderLogo image={image} name={name} />);

    const img = screen.getByAltText(name);

    expect(img).toHaveAttribute('alt', name);
  });

  it('does not render an image without alt text if name prop is not provided', () => {
    const image = 'https://example.com/logo.jpg';

    renderComponent(<ProviderLogo image={image} name={undefined} />);

    const img = screen.getByTestId('provider-image');

    expect(img).toHaveAttribute('alt', '');
  });
});
