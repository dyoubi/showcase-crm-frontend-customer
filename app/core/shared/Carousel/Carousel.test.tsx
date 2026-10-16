import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { IconArrowLeft } from '@/core/shared/Icons';

import { theme } from '@/themes/main';

import { Carousel } from './Carousel';

jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => <a>{children}</a>);
jest.mock('react-slick', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Carousel Component', () => {
  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('renders the children correctly', () => {
    renderWithTheme(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>,
    );

    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('applies the autoplay setting correctly', () => {
    renderWithTheme(
      <Carousel autoplay>
        <div>Slide 1</div>
      </Carousel>,
    );

    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('renders the header and header icon', () => {
    renderWithTheme(
      <Carousel header="Carousel Header" headerIcon={<IconArrowLeft data-testid="icon-left" />}>
        <div>Slide 1</div>
      </Carousel>,
    );

    expect(screen.getByText('Carousel Header')).toBeInTheDocument();
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
  });
});
