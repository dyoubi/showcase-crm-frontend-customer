import { fireEvent, render, screen, userEvent } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { Button } from './Button';
import { ButtonColor } from './Button.types';

describe('<Button />', () => {
  it('renders', () => {
    render(<Button>test</Button>);

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('is disabled', () => {
    render(<Button disabled>test</Button>);
    expect(screen.getByText('test').closest('button')).toBeDisabled();
  });

  it('will call onClick when enabled', () => {
    const onClick = jest.fn();

    render(
      <Button title="Test button" onClick={onClick}>
        test
      </Button>,
    );

    fireEvent.click(screen.getByText('test'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('will not call onClick when disabled', () => {
    const onClick = jest.fn();

    render(<Button disabled>test</Button>);
    userEvent.click(screen.getByText('test'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders properly as primary', () => {
    render(<Button color={ButtonColor.Primary}>test</Button>);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('test').closest('button')).toHaveStyleRule(
      'background',
      theme.rebrandingColors.gradients.blue,
    );
  });

  it('renders properly as secondary', () => {
    render(<Button color={ButtonColor.Secondary}>test</Button>);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('test').closest('button')).toHaveStyleRule(
      'background',
      theme.rebrandingColors.gradients.red,
    );
  });

  it('renders properly as tertiary', () => {
    render(<Button color={ButtonColor.Tertiary}>test</Button>);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('test').closest('button')).toHaveStyleRule(
      'background',
      theme.rebrandingColors.palette.dark[60],
    );
  });
});
