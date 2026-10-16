import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { Heading } from './Heading';

const renderComponent = (component: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('Heading component', () => {
  it('renders the children correctly', () => {
    renderComponent(<Heading size="h1">Test Heading</Heading>);

    // Check if the rendered text matches the children
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('applies the correct element type', () => {
    renderComponent(
      <Heading size="h2" element="h2">
        Test Heading
      </Heading>,
    );

    // Check if the rendered element is an h2
    const heading = screen.getByText('Test Heading');

    expect(heading.tagName).toBe('H2');
  });

  it('applies the default element (size) when no element is provided', () => {
    renderComponent(<Heading size="h3">Test Heading</Heading>);

    // Check if the rendered element is an h3
    const heading = screen.getByText('Test Heading');

    expect(heading.tagName).toBe('H3');
  });

  it('applies the correct alignment', () => {
    renderComponent(
      <Heading size="h2" align="center">
        Test Heading
      </Heading>,
    );

    // Check if the heading has the correct text alignment
    const heading = screen.getByText('Test Heading');

    expect(heading).toHaveStyle('text-align: center');
  });

  it('applies the correct color', () => {
    renderComponent(
      <Heading size="h2" color="red">
        Test Heading
      </Heading>,
    );

    // Check if the heading has the correct color
    const heading = screen.getByText('Test Heading');

    expect(heading).toHaveStyle('color: red');
  });

  it('applies the correct whiteSpace styling', () => {
    renderComponent(
      <Heading size="h2" whiteSpace="nowrap">
        Test Heading
      </Heading>,
    );

    // Check if the heading has the correct white-space style
    const heading = screen.getByText('Test Heading');

    expect(heading).toHaveStyle('white-space: nowrap');
  });
});
