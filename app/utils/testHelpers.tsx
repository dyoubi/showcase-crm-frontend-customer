import { ReactNode } from 'react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { theme } from '@/themes/main';

type TestProvidersProps = {
  children: ReactNode;
};

const customRender = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ui: any,
  { ...renderOptions } = {},
) => {
  const TestProviders = ({ children }: TestProvidersProps) => (
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </IntlProvider>
  );

  return render(ui, {
    wrapper: TestProviders,
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { userEvent };
export { customRender as render };
