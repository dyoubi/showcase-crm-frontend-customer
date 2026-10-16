import { render, screen } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { ProgressBar } from './ProgressBar';

describe('<ProgressBar />', () => {
  it('renders correctly', () => {
    render(<ProgressBar progress={30} />);

    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('shows correct progress', () => {
    const {
      container: { firstChild: progressBar },
    } = render(<ProgressBar progress={50} />);

    expect(progressBar?.firstChild).toHaveStyleRule('width', '50%');
  });

  it('renders with correct style rules', () => {
    const {
      container: { firstChild: progressBar },
    } = render(<ProgressBar progress={30} />);

    expect(progressBar?.firstChild).toHaveStyleRule('width', '30%');
    expect(progressBar?.firstChild).toHaveStyleRule('background', theme.rebrandingColors.palette.green[20]);
  });
});
