import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { NeedAuthMessage } from './index';

// Mock the `react-intl` library for testing purposes
const messages = {
  youNeedToBeAuthenticated: 'You need to be authenticated for have access to this page.',
};

describe('NeedAuthMessage', () => {
  it('renders the authentication message correctly', () => {
    render(
      <IntlProvider locale="en" messages={messages}>
        <NeedAuthMessage />
      </IntlProvider>,
    );

    expect(screen.getByText('You need to be authenticated for have access to this page.')).toBeInTheDocument();
  });

  it('renders the message with the correct styles', () => {
    const { container } = render(
      <IntlProvider locale="en" messages={messages}>
        <NeedAuthMessage />
      </IntlProvider>,
    );

    const flexContainer = container.querySelector('div');

    expect(flexContainer).toHaveStyle('height: 550px');
    expect(flexContainer).toHaveStyle('padding: 50px');
  });
});
