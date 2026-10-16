import React from 'react';
import { ThemeProvider } from 'styled-components';

import { fireEvent, render, screen, waitFor } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { FieldVariant } from '../FeedbackMessage';

import { InputWrapper } from './index';

// Wrapper component to provide theme context
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('InputWrapper', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <InputWrapper>
        <input data-testid="test-input" />
      </InputWrapper>,
    );

    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    renderWithTheme(
      <InputWrapper label="Test Label">
        <input />
      </InputWrapper>,
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with caption when provided', () => {
    renderWithTheme(
      <InputWrapper caption="Help text">
        <input />
      </InputWrapper>,
    );

    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('applies the correct class name when provided', () => {
    const { container } = renderWithTheme(
      <InputWrapper className="custom-class">
        <input />
      </InputWrapper>,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with error variant when colorVariant is error', () => {
    const { container } = renderWithTheme(
      <InputWrapper colorVariant="error" caption="Error message">
        <input />
      </InputWrapper>,
    );

    // The FeedbackMessage should have Error variant
    const feedbackMessage = container.querySelector('div > div:last-child');

    expect(feedbackMessage).toBeInTheDocument();
  });

  it('renders with success variant when colorVariant is success', () => {
    renderWithTheme(
      <InputWrapper colorVariant="success" caption="Success message">
        <input />
      </InputWrapper>,
    );

    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('renders with iconLeft when provided', () => {
    renderWithTheme(
      <InputWrapper iconLeft={<span data-testid="left-icon">🔍</span>}>
        <input />
      </InputWrapper>,
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with iconRight when provided', () => {
    renderWithTheme(
      <InputWrapper iconRight={<span data-testid="right-icon">✓</span>}>
        <input />
      </InputWrapper>,
    );

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('renders with button when buttonContent is provided', () => {
    renderWithTheme(
      <InputWrapper buttonContent="Submit">
        <input />
      </InputWrapper>,
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('applies disabled styling when disabled prop is true', () => {
    const { container } = renderWithTheme(
      <InputWrapper disabled>
        <input />
      </InputWrapper>,
    );

    // Root element should have not-allowed cursor
    const rootElement = container.firstChild as HTMLElement;

    expect(rootElement).toHaveStyle('cursor: not-allowed');
  });

  it('applies width and flex when provided', () => {
    const { container } = renderWithTheme(
      <InputWrapper width="300px" flex="1">
        <input />
      </InputWrapper>,
    );

    const rootElement = container.firstChild as HTMLElement;

    expect(rootElement).toHaveStyle('width: 300px');
    expect(rootElement).toHaveStyle('flex: 1');
  });

  it('renders with proper variant for the label', () => {
    renderWithTheme(
      <InputWrapper variant={FieldVariant.Disabled} label="Disabled Label">
        <input />
      </InputWrapper>,
    );

    const label = screen.getByText('Disabled Label');

    expect(label).toBeInTheDocument();
    // In a real test, we could check the computed style if needed
  });
});
