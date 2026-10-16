import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { Text } from './Text';

const renderComponent = (component: React.ReactNode) => {
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Text component', () => {
  it('renders children correctly', () => {
    renderComponent(<Text level="medium">Test Text</Text>);

    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('applies the correct type when type prop is passed', () => {
    renderComponent(
      <Text type="link" level="medium">
        Test Text
      </Text>,
    );

    const text = screen.getByText('Test Text');

    expect(text).toHaveStyle('font-weight: 700');
    expect(text).toHaveStyle('color: #231B47');
  });

  it('applies the correct level when level prop is passed', () => {
    renderComponent(<Text level="big">Test Text</Text>);

    const text = screen.getByText('Test Text');

    expect(text).toHaveStyle('font-size: 18px');
    expect(text).toHaveStyle('line-height: 24px');
  });
});
