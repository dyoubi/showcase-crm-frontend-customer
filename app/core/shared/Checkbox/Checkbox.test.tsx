import { render, screen, userEvent, waitFor } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { Checkbox } from './Checkbox';
import { CheckboxVariant } from './Checkbox.types';

describe('<Checkbox />', () => {
  it('renders corectly', () => {
    render(<Checkbox>checkbox label</Checkbox>);
    const checkboxLabel = screen.getByText('checkbox label');

    expect(screen.getByTestId('checkbox')).toBeInTheDocument();
    expect(checkboxLabel).toBeInTheDocument();
  });

  it('works correctly as default', () => {
    render(<Checkbox />);
    const checkbox = screen.getByTestId('checkbox');

    userEvent.click(checkbox);
    waitFor(
      () => {
        expect(checkbox).toHaveStyleRule('background', theme.rebrandingColors.gradients.blue);
      },
      {
        interval: 300,
      },
    );
  });

  it('works correctly when clicking on label', () => {
    render(<Checkbox>checkbox label</Checkbox>);
    const checkboxLabel = screen.getByText('checkbox label');

    userEvent.click(checkboxLabel);
    waitFor(
      () => {
        expect(screen.getByTestId('checkbox').closest('input')).toHaveAttribute('checked');
      },
      {
        interval: 300,
      },
    );
  });
});
