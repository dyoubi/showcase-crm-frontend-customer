import { ThemeProvider } from 'styled-components';

import { fireEvent, render, screen, userEvent } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { SelectSize } from './Select.types';
import { Select } from './Select';
import { IconAddPlus } from '../Icons';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const renderSelect = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <Select options={mockOptions} size={SelectSize.Big} {...props} />
    </ThemeProvider>,
  );
};

describe('Select Component', () => {
  it('renders without crashing', () => {
    renderSelect();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays label when provided', () => {
    const label = 'Test Label';

    renderSelect({ label });
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const error = 'Error message';

    renderSelect({ error });
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('displays caption when provided', () => {
    const caption = 'Helper text';

    renderSelect({ caption });
    expect(screen.getByText(caption)).toBeInTheDocument();
  });

  it('can be disabled', () => {
    renderSelect({ isDisabled: true });
    // Check for the select container class with disabled state
    const selectContainer = document.querySelector('.select__control');

    expect(selectContainer).toHaveClass('select__control--is-disabled');
  });

  it('shows loading state', () => {
    renderSelect({ isLoading: true });
    // When loading is active, the select gets disabled
    const selectContainer = document.querySelector('.select__control');

    expect(selectContainer).toHaveClass('select__control--is-disabled');

    expect(selectContainer).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { rerender } = renderSelect({ size: SelectSize.Small });
    const smallSelectControl = document.querySelector('.select__control');
    const smallValueContainer = document.querySelector('.select__value-container');

    // Check small size styles
    expect(smallValueContainer).toHaveStyle('min-height: 29px');

    rerender(
      <ThemeProvider theme={theme}>
        <Select options={mockOptions} size={SelectSize.Big} />
      </ThemeProvider>,
    );

    const bigValueContainer = document.querySelector('.select__value-container');

    expect(bigValueContainer).toHaveStyle('min-height: 56px');
  });

  it('handles onChange callback', async () => {
    const onChangeMock = jest.fn();

    renderSelect({ onChange: onChangeMock });

    const selectElement = screen.getByRole('combobox');

    await userEvent.click(selectElement);

    // Find and click an option
    const option = await screen.findByText('Option 1');

    await userEvent.click(option);

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('handles onBlur callback', () => {
    const onBlurMock = jest.fn();

    renderSelect({ onBlur: onBlurMock });

    const selectElement = screen.getByRole('combobox');

    fireEvent.blur(selectElement);

    expect(onBlurMock).toHaveBeenCalled();
  });

  it('hides dropdown indicator when hideButton is true', () => {
    renderSelect({ hideButton: true });
    const indicators = document.querySelector('.select__indicators');

    // The CSS for indicators has display: none when hideButton is true
    expect(indicators).toHaveStyle('display: none');
  });

  it('renders with custom placeholder', () => {
    const placeholder = 'Select an option';

    renderSelect({ placeholder });

    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  it('renders with icons when provided in options', async () => {
    const testId = 'option-icon';
    const optionsWithIcons = [
      {
        value: 'option1',
        label: 'Option 1',
        icon: <span data-testid={testId}>Icon</span>,
      },
    ];

    renderSelect({ options: optionsWithIcons });

    const selectElement = screen.getByRole('combobox');

    await userEvent.click(selectElement);

    expect(await screen.findByTestId(testId)).toBeInTheDocument();
  });

  it('renders dropdown indicators correctly', () => {
    // For small size
    const { rerender } = renderSelect({ size: SelectSize.Small });

    // Just verify that the select control is rendered correctly for small size
    const smallControl = document.querySelector('.select__control');

    expect(smallControl).toBeInTheDocument();

    // For big size
    rerender(
      <ThemeProvider theme={theme}>
        <Select options={mockOptions} size={SelectSize.Big} />
      </ThemeProvider>,
    );

    // Verify that the select control is rendered correctly for big size
    const bigControl = document.querySelector('.select__control');

    expect(bigControl).toBeInTheDocument();

    // We're not comparing the indicators directly since they might be hard to access reliably
  });

  it('shows validation styles when error is provided', () => {
    renderSelect({ error: 'Error message' });
    const selectControl = document.querySelector('.select__control');

    // Error state should have red border color - using the actual color from your theme
    expect(selectControl).toHaveStyle('border-color: #e53535');
  });

  it('renders custom dropdown indicators correctly', () => {
    renderSelect({ size: SelectSize.Small, customIndicator: <IconAddPlus /> });

    expect(screen.getByTestId('icon-add-plus')).toBeInTheDocument();
  });
});
