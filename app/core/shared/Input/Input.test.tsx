import { Button } from '@/core/shared/Button';
import '@testing-library/jest-dom';

import { fireEvent, render, screen, userEvent } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { FieldVariant } from '../FeedbackMessage';
import { IconArrowDown, IconArrowUp } from '../Icons';

import { IconInput, Input } from '.';

describe('<Input />', () => {
  it('renders correctly', () => {
    render(<Input label="default text input" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('default text input')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveStyleRule('border', '2px solid transparent');
  });

  it('displays label, placeholder and caption', () => {
    render(<Input label="test label" caption="test caption" placeholder="test placeholder" />);

    expect(screen.getByText('test label')).toBeInTheDocument();
    expect(screen.getByText('test caption')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
  });

  it('allows user to type in something', async () => {
    render(<Input label="default text input" />);

    const input: HTMLInputElement = screen.getByRole('textbox');

    userEvent.type(input, 'lorem ipsum').then(() => {
      expect(input.value).toBe('lorem ipsum');
    });
  });

  it('does not allow user to type when field is disabled', () => {
    render(<Input label="default text input" disabled />);

    const input: HTMLInputElement = screen.getByRole('textbox');

    userEvent.type(input, 'lorem ipsum');

    expect(input.value).toBe('');
  });

  it('is not selectable', () => {
    render(<Input label="default text input" selectable={false} />);

    const input: HTMLInputElement = screen.getByRole('textbox');

    expect(input).toHaveStyleRule('user-select', 'none');
  });

  it('displays error messaage', () => {
    render(<Input label="default text input" error="error error error" />);

    expect(screen.getByText('error error error')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveStyleRule(
      'border',
      `1px solid ${theme.rebrandingColors.colorsToBeDeprecated.red[100]}`,
    );
  });

  it('displays button', () => {
    render(<IconInput button={<Button>button</Button>} selectable variant={FieldVariant.Default} />);

    expect(screen.getByText('button')).toBeInTheDocument();
  });
  it('it should call function when icon is clicked', () => {
    const mockOnLeftIconClick = jest.fn();
    const mockOnRightIconClick = jest.fn();

    render(
      <IconInput
        selectable
        variant={FieldVariant.Default}
        iconLeft={<IconArrowDown onClick={mockOnLeftIconClick} />}
        iconRight={<IconArrowUp onClick={mockOnRightIconClick} />}
      />,
    );
    const leftIcon = screen.getByTestId('icon-arrow-down');
    const rightIcon = screen.getByTestId('icon-arrow-up');

    fireEvent.click(leftIcon);
    expect(mockOnLeftIconClick).toHaveBeenCalledTimes(1);

    fireEvent.click(rightIcon);
    expect(mockOnRightIconClick).toHaveBeenCalledTimes(1);
  });
});
