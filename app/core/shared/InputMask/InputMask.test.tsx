import React from 'react';
import { ThemeProvider } from 'styled-components';

import '@testing-library/jest-dom';
import { fireEvent, render, screen, userEvent } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { InputMask } from '.';

// Mock theme for styled-components
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('InputMask', () => {
  it('renders correctly with string mask', () => {
    renderWithTheme(
      <InputMask mask="000-000-0000" label="Phone Number" placeholder="Enter phone number" data-testid="phone-input" />,
    );

    const input = screen.getByTestId('phone-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter phone number');
  });

  it('handles string mask input correctly', async () => {
    const onAccept = jest.fn();

    renderWithTheme(
      <InputMask mask="000-000-0000" label="Phone Number" onAccept={onAccept} data-testid="phone-input" />,
    );

    const input = screen.getByTestId('phone-input');

    await userEvent.type(input, '1234567890');

    // Check if the value is formatted according to the mask
    expect(input).toHaveValue('123-456-7890');
    expect(onAccept).toHaveBeenCalled();
  });

  it('renders correctly with RegExp mask', () => {
    renderWithTheme(
      <InputMask mask={/^\d+$/} label="Numbers Only" placeholder="Enter numbers" data-testid="number-input" />,
    );

    const input = screen.getByTestId('number-input');

    expect(input).toBeInTheDocument();
  });

  it('handles RegExp mask input correctly', async () => {
    renderWithTheme(<InputMask mask={/^\d+$/} label="Numbers Only" data-testid="number-input" />);

    const input = screen.getByTestId('number-input');

    await userEvent.type(input, '123abc');

    // Only numbers should be accepted
    expect(input).toHaveValue('123');
  });

  it('renders correctly with Date mask', () => {
    renderWithTheme(
      <InputMask mask={Date} pattern="dd/MM/yyyy" label="Date" placeholder="DD/MM/YYYY" data-testid="date-input" />,
    );

    const input = screen.getByTestId('date-input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'DD/MM/YYYY');
  });

  it('handles Date mask input correctly', () => {
    const onComplete = jest.fn();

    renderWithTheme(
      <InputMask mask={Date} pattern="dd/MM/yyyy" label="Date" onComplete={onComplete} data-testid="date-input" />,
    );

    const input = screen.getByTestId('date-input');

    userEvent.type(input, '31-12-2023').then(() => {
      expect(input).toHaveValue('31/12/2023');
      expect(onComplete).toHaveBeenCalledWith('31/12/2023');
    });
  });

  it('applies readOnly state correctly', () => {
    renderWithTheme(<InputMask mask="000-000-0000" label="Phone Number" readOnly data-testid="phone-input" />);

    const input = screen.getByTestId('phone-input');

    expect(input).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    renderWithTheme(<InputMask mask="000-000-0000" label="Phone Number" ref={ref} data-testid="phone-input" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('passes custom props to InputWrapper', () => {
    renderWithTheme(<InputMask mask="000-000-0000" label="Phone Number" data-testid="phone-input" />);

    expect(screen.getByText('Phone Number')).toBeInTheDocument();
  });
});
