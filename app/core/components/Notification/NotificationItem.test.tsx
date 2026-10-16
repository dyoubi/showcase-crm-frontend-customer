import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { NotificationItem } from './NotificationItem';
import { NotificationItemVariant } from './NotificationItem.types';

const renderComponent = (component: React.ReactNode) => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>,
  );
};

describe('NotificationItem', () => {
  it('renders default icon when no icon is provided and variant is default', () => {
    renderComponent(
      <NotificationItem variant={NotificationItemVariant.Default}>Some default notification content.</NotificationItem>,
    );

    expect(screen.getByTestId('icon-info')).toBeInTheDocument();
  });

  it('renders error icon when variant is Error', () => {
    renderComponent(
      <NotificationItem variant={NotificationItemVariant.Error}>Error notification content.</NotificationItem>,
    );

    expect(screen.getByTestId('icon-info-circle')).toBeInTheDocument();
  });

  it('renders success icon when variant is Success', () => {
    renderComponent(
      <NotificationItem variant={NotificationItemVariant.Success}>Success notification content.</NotificationItem>,
    );

    expect(screen.getByTestId('icon-tick-circle')).toBeInTheDocument();
  });

  it('renders warning icon when variant is Warning', () => {
    renderComponent(
      <NotificationItem variant={NotificationItemVariant.Warning}>Warning notification content.</NotificationItem>,
    );

    expect(screen.getByTestId('icon-danger')).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderComponent(
      <NotificationItem variant={NotificationItemVariant.Default}>
        This is a notification with content.
      </NotificationItem>,
    );

    expect(screen.getByText('This is a notification with content.')).toBeInTheDocument();
  });

  it('renders header if provided', () => {
    renderComponent(
      <NotificationItem variant={NotificationItemVariant.Default} header="Notification Header">
        This is a notification with a header.
      </NotificationItem>,
    );

    expect(screen.getByText('Notification Header')).toBeInTheDocument();
  });

  it('does not render header when not provided', () => {
    renderComponent(
      <NotificationItem variant={NotificationItemVariant.Default}>
        This is a notification without a header.
      </NotificationItem>,
    );

    expect(screen.queryByText('Notification Header')).toBeNull();
  });

  it('renders icon passed via prop', () => {
    const customIcon = <span data-testid="custom-icon">Custom Icon</span>;

    renderComponent(
      <NotificationItem variant={NotificationItemVariant.Default} icon={customIcon}>
        Notification with custom icon.
      </NotificationItem>,
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
