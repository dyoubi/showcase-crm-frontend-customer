import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { FeedbackMessage } from './FeedbackMessage';
import { FieldVariant } from './FeedbackMessage.types';

describe('FeedbackMessage Component', () => {
  it('renders correctly with default props', () => {
    render(
      <ThemeProvider theme={theme}>
        <FeedbackMessage>Default message</FeedbackMessage>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('icon-info-circle')).toBeInTheDocument();
    expect(screen.getByText('Default message')).toBeInTheDocument();
  });

  it('renders with correct icon and styles for variant "Valid"', () => {
    render(
      <ThemeProvider theme={theme}>
        <FeedbackMessage variant={FieldVariant.Valid}>Success message</FeedbackMessage>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('icon-tick-circle')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toBeInTheDocument();

    const messageElement = screen.getByText('Success message').parentElement;

    expect(messageElement).toHaveStyle(`color: ${theme.rebrandingColors.palette.green[20]}`);
    expect(messageElement?.querySelector('svg')).toHaveStyle(`stroke: ${theme.rebrandingColors.palette.green[20]}`);
  });

  it('renders with correct icon and styles for variant "Error"', () => {
    render(
      <ThemeProvider theme={theme}>
        <FeedbackMessage variant={FieldVariant.Error}>Error message</FeedbackMessage>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('icon-info-circle')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();

    const messageElement = screen.getByText('Error message').parentElement;

    expect(messageElement).toHaveStyle(`color: ${theme.rebrandingColors.colorsToBeDeprecated.red[100]}`);
    expect(messageElement?.querySelector('svg')).toHaveStyle(
      `stroke: ${theme.rebrandingColors.colorsToBeDeprecated.red[100]}`,
    );
  });

  it('renders with correct icon and styles for variant "Disabled"', () => {
    render(
      <ThemeProvider theme={theme}>
        <FeedbackMessage variant={FieldVariant.Disabled}>Disabled message</FeedbackMessage>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('icon-info-circle')).toBeInTheDocument();
    expect(screen.getByText('Disabled message')).toBeInTheDocument();

    const messageElement = screen.getByText('Disabled message').parentElement;

    expect(messageElement).toHaveStyle(`color: ${theme.rebrandingColors.palette.light[40]}`);
    expect(messageElement?.querySelector('svg')).toHaveStyle(`stroke: ${theme.rebrandingColors.palette.light[40]}`);
  });

  it('renders with correct styles when "withInput" is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <FeedbackMessage withInput>Message with input styling</FeedbackMessage>
      </ThemeProvider>,
    );

    expect(screen.getByText('Message with input styling')).toBeInTheDocument();

    const messageElement = screen.getByText('Message with input styling').parentElement;

    expect(messageElement).toHaveStyle(`color: ${theme.rebrandingColors.colorsToBeDeprecated.dark[20]}`);
    expect(messageElement?.querySelector('svg')).toHaveStyle(
      `stroke: ${theme.rebrandingColors.colorsToBeDeprecated.dark[20]}`,
    );
  });

  it('does not render an icon when "noIcon" is true', () => {
    render(
      <ThemeProvider theme={theme}>
        <FeedbackMessage noIcon>Message without icon</FeedbackMessage>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId('icon-info-circle')).toBeNull();
    expect(screen.queryByTestId('icon-tick-circle')).toBeNull();
    expect(screen.getByText('Message without icon')).toBeInTheDocument();
  });

  it('renders default icon when no variant is passed', () => {
    render(
      <ThemeProvider theme={theme}>
        <FeedbackMessage>Default variant message</FeedbackMessage>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('icon-info-circle')).toBeInTheDocument();
    expect(screen.getByText('Default variant message')).toBeInTheDocument();
  });
});
