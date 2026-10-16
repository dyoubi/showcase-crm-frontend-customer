import React from 'react';
import { ThemeProvider } from 'styled-components';

import { render, userEvent, waitFor } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { Tooltip, useTooltipRef } from './index';

describe('Tooltip', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message">Hover me</Tooltip>
      </ThemeProvider>,
    );

    expect(getByText('Hover me')).toBeInTheDocument();
  });

  it('should show tooltip on mouse enter', async () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message">Hover me</Tooltip>
      </ThemeProvider>,
    );

    userEvent.hover(getByText('Hover me'));
    await waitFor(() => {
      expect(getByText('Tooltip message')).toBeInTheDocument();
    });
  });

  it('should hide tooltip on mouse leave', async () => {
    const { getByText, queryByText } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message">Hover me</Tooltip>
      </ThemeProvider>,
    );
    const triggerElement = getByText('Hover me');

    userEvent.hover(triggerElement);
    await waitFor(() => {
      expect(getByText('Tooltip message')).toBeInTheDocument();
    });

    userEvent.unhover(triggerElement);
    await waitFor(() => {
      expect(queryByText('Tooltip message')).not.toBeInTheDocument();
    });
  });

  it('should toggle tooltip on click when displayOn is click', async () => {
    const { getByText, queryByText } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message" displayOn="click">
          Click me
        </Tooltip>
      </ThemeProvider>,
    );
    const triggerElement = getByText('Click me');

    userEvent.click(triggerElement);
    await waitFor(() => {
      expect(getByText('Tooltip message')).toBeInTheDocument();
    });

    userEvent.click(triggerElement);
    await waitFor(() => {
      expect(queryByText('Tooltip message')).not.toBeInTheDocument();
    });
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message" className="custom-class">
          Hover me
        </Tooltip>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should call onShow and onHide callbacks', async () => {
    const onShow = jest.fn();
    const onHide = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message" onShow={onShow} onHide={onHide}>
          Hover me
        </Tooltip>
      </ThemeProvider>,
    );
    const triggerElement = getByText('Hover me');

    userEvent.hover(triggerElement);
    await waitFor(() => {
      expect(onShow).toHaveBeenCalled();
    });

    userEvent.unhover(triggerElement);
    await waitFor(() => {
      expect(onHide).toHaveBeenCalled();
    });
  });

  it('should show tooltip on focus', async () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message" displayOn="mouseenter focus">
          Focus me
        </Tooltip>
      </ThemeProvider>,
    );

    userEvent.pointer('focus').then(() => {
      expect(getByText('Tooltip message')).toBeInTheDocument();
    });
  });

  it('should hide tooltip on blur', async () => {
    const { getByText, queryByText } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message" displayOn="mouseenter focus">
          Focus me
        </Tooltip>
      </ThemeProvider>,
    );

    userEvent.pointer('focus').then(() => {
      expect(getByText('Tooltip message')).toBeInTheDocument();
    });

    userEvent.pointer('focus').then(() => {
      expect(queryByText('Tooltip message')).not.toBeInTheDocument();
    });
  });

  it('should show tooltip when visible prop is true', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message" visible>
          Always visible
        </Tooltip>
      </ThemeProvider>,
    );

    expect(getByText('Tooltip message')).toBeInTheDocument();
  });

  it('should hide tooltip when visible prop is false', () => {
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <Tooltip message="Tooltip message" visible={false}>
          Never visible
        </Tooltip>
      </ThemeProvider>,
    );

    expect(queryByText('Tooltip message')).not.toBeInTheDocument();
  });

  it('should handle manual show and hide using ref', async () => {
    const TestComponent = () => {
      const tooltipRef = useTooltipRef();

      return (
        <ThemeProvider theme={theme}>
          <Tooltip ref={tooltipRef} message="Tooltip message" displayOn="manual">
            Manual trigger
          </Tooltip>
          <button type="button" onClick={() => tooltipRef.current?.show()}>
            Show
          </button>
          <button type="button" onClick={() => tooltipRef.current?.hide()}>
            Hide
          </button>
        </ThemeProvider>
      );
    };

    const { getByText, queryByText } = render(<TestComponent />);

    userEvent.click(getByText('Show')).then(() => {
      expect(getByText('Tooltip message')).toBeInTheDocument();
    });

    userEvent.click(getByText('Hide'));
    await waitFor(() => {
      expect(queryByText('Tooltip message')).not.toBeInTheDocument();
    });
  });
});
