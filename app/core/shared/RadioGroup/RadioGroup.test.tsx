import { fireEvent, render, screen } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { RadioGroup } from './RadioGroup';

const radioOptions = [
  {
    label: 'Option 1',
    value: 'option-1',
  },
  {
    label: 'Option 2',
    value: 'option-2',
  },
];

describe('<Radiogroup />', () => {
  it('renders correctly', () => {
    render(
      <RadioGroup
        name="test-radiogroup"
        options={radioOptions}
        defaultValue={radioOptions[0].value}
        forwardedRef={undefined}
        horizontal={false}
        onBlur={() => undefined}
        onChange={() => undefined}
      />,
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('has working radio buttons', () => {
    render(
      <RadioGroup
        name="test-radiogroup"
        options={radioOptions}
        defaultValue={radioOptions[0].value}
        forwardedRef={undefined}
        horizontal={false}
        onBlur={() => undefined}
        onChange={() => undefined}
      />,
    );

    const radio1 = screen.getByLabelText('Option 1');
    const radio2 = screen.getByLabelText('Option 2');

    fireEvent.click(radio2);

    expect(radio2).toBeChecked();
    expect(radio1).not.toBeChecked();
  });

  it('has correct styling', () => {
    render(
      <RadioGroup
        name="test-radiogroup"
        options={radioOptions}
        defaultValue={radioOptions[0].value}
        forwardedRef={undefined}
        horizontal={false}
        onBlur={() => undefined}
        onChange={() => undefined}
      />,
    );

    const radio1 = screen.getByText('Option 1');
    const radio2 = screen.getByLabelText('Option 2');

    fireEvent.click(radio2);

    expect(radio1).toHaveStyleRule('background', theme.rebrandingColors.gradients.blue, { modifier: '::before' });
  });
});
