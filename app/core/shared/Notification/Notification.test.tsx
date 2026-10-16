import React from 'react';
import { ThemeProvider } from 'styled-components';

import { fireEvent, render, screen, waitFor } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { Notification } from './Notification';

// Mock timer
jest.useFakeTimers();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Notification', () => {
  it('renders correctly with basic props', () => {
    renderWithTheme(<Notification title="Test Title" text="Test Message" type="info" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders different notification types', () => {
    const { rerender } = renderWithTheme(<Notification title="Info" text="Info message" type="info" />);

    expect(screen.getByRole('status')).toHaveAttribute('variant', 'info');

    rerender(
      <ThemeProvider theme={theme}>
        <Notification title="Error" text="Error message" type="error" />
      </ThemeProvider>,
    );
    expect(screen.getByRole('status')).toHaveAttribute('variant', 'error');

    rerender(
      <ThemeProvider theme={theme}>
        <Notification title="Success" text="Success message" type="success" />
      </ThemeProvider>,
    );
    expect(screen.getByRole('status')).toHaveAttribute('variant', 'success');

    rerender(
      <ThemeProvider theme={theme}>
        <Notification title="Warning" text="Warning message" type="warning" />
      </ThemeProvider>,
    );
    expect(screen.getByRole('status')).toHaveAttribute('variant', 'warning');
  });

  it('calls onClick when close button is clicked', () => {
    const handleClick = jest.fn();

    renderWithTheme(<Notification title="Test Title" text="Test Message" type="info" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not show close button when showCloseButton is false', () => {
    renderWithTheme(<Notification title="Test Title" text="Test Message" type="info" showCloseButton={false} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onClick after autoRemoveDelay when autoRemove is true', async () => {
    const handleClick = jest.fn();

    renderWithTheme(
      <Notification
        title="Auto Remove"
        text="This will auto remove"
        type="info"
        onClick={handleClick}
        autoRemove
        autoRemoveDelay={2000}
      />,
    );

    expect(handleClick).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  it('does not auto remove when autoRemove is false', () => {
    const handleClick = jest.fn();

    renderWithTheme(
      <Notification
        title="No Auto Remove"
        text="This will not auto remove"
        type="info"
        onClick={handleClick}
        autoRemove={false}
      />,
    );

    // Fast-forward time
    jest.advanceTimersByTime(10000);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders the progress bar when autoRemoveDelay > 0', () => {
    const { container } = renderWithTheme(
      <Notification title="With Progress" text="Has progress bar" type="info" autoRemoveDelay={5000} />,
    );

    // Use a more reliable selector
    const progressBarWrapper = container.querySelector('[data-testid="notification-progress-bar-wrapper"]');

    expect(progressBarWrapper).toBeInTheDocument();

    // The ProgressBar is a direct child of the wrapper
    const progressBar = container.querySelector('[data-testid="notification-progress-bar"]');

    expect(progressBar).toBeInTheDocument();

    // Check that it has the animation style
    expect(progressBar).toHaveStyle('animation: decreaseWidth 5000ms linear forwards');
  });

  it('does not render the progress bar when autoRemoveDelay is 0', () => {
    const { container } = renderWithTheme(
      <Notification title="No Progress" text="No progress bar" type="info" autoRemoveDelay={0} />,
    );

    const progressBarWrapper = container.querySelector('[data-testid="notification-progress-bar-wrapper"]');

    expect(progressBarWrapper).not.toBeInTheDocument();
  });

  it('renders with JSX elements as title and text', () => {
    renderWithTheme(
      <Notification
        title={<span data-testid="jsx-title">JSX Title</span>}
        text={<span data-testid="jsx-text">JSX Text</span>}
        type="info"
      />,
    );

    expect(screen.getByTestId('jsx-title')).toBeInTheDocument();
    expect(screen.getByTestId('jsx-text')).toBeInTheDocument();
  });

  it('cleans up timeout on unmount', () => {
    const handleClick = jest.fn();
    const { unmount } = renderWithTheme(
      <Notification
        title="Test Cleanup"
        text="Testing cleanup"
        type="info"
        onClick={handleClick}
        autoRemove
        autoRemoveDelay={3000}
      />,
    );

    // Unmount before timeout is triggered
    unmount();

    // Fast-forward time
    jest.advanceTimersByTime(3000);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
