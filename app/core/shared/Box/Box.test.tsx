import { ThemeProvider } from 'styled-components';

import { render } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { Box } from './Box';

const testTheme = {
  ...theme,
  padding: {
    xxxs: '4px',
    xxs: '8px',
    xs: '12px',
    s: '16px',
    m: '18px',
    l: '24px',
    xl: '32px',
    xxl: '56px',
  },
  margin: {
    xxxs: '4px',
    xxs: '8px',
    xs: '12px',
    s: '16px',
    m: '24px',
    l: '32px',
    xl: '64px',
    xxl: '96px',
  },
};

describe('<Box />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box>Content</Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies margin and padding styles correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box mt="m" pt="l">
          Content
        </Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyleRule('margin-top', testTheme.margin.m);
    expect(container.firstChild).toHaveStyleRule('padding-top', testTheme.padding.l);
  });

  it('applies width and height styles correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box width="100px" height="200px">
          Content
        </Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyleRule('width', '100px');
    expect(container.firstChild).toHaveStyleRule('height', '200px');
  });

  it('applies textAlign style correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box align="center">Content</Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyleRule('text-align', 'center');
  });

  it('applies individual margin styles correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box mb="s" ml="l" mr="xl" mt="xxl">
          Content
        </Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyleRule('margin-bottom', testTheme.margin.s);
    expect(container.firstChild).toHaveStyleRule('margin-left', testTheme.margin.l);
    expect(container.firstChild).toHaveStyleRule('margin-right', testTheme.margin.xl);
    expect(container.firstChild).toHaveStyleRule('margin-top', testTheme.margin.xxl);
  });

  it('applies individual padding styles correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box pb="s" pl="l" pr="xl" pt="xxl">
          Content
        </Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyleRule('padding-bottom', testTheme.padding.s);
    expect(container.firstChild).toHaveStyleRule('padding-left', testTheme.padding.l);
    expect(container.firstChild).toHaveStyleRule('padding-right', testTheme.padding.xl);
    expect(container.firstChild).toHaveStyleRule('padding-top', testTheme.padding.xxl);
  });

  it('applies width and height styles correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box width="100px" height="200px">
          Content
        </Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyleRule('width', '100px');
    expect(container.firstChild).toHaveStyleRule('height', '200px');
  });

  it('applies textAlign style correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box align="center">Content</Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyleRule('text-align', 'center');
  });

  it('applies padding correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box p="xl">Content</Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyleRule('padding', testTheme.padding.xl);
  });

  it('applies margib correctly', () => {
    const { container } = render(
      <ThemeProvider theme={testTheme}>
        <Box m="l">Content</Box>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveStyleRule('margin', testTheme.margin.l);
  });
});
