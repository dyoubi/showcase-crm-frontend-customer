import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';

import { getRankBasedContent } from '@/features/VipPage/components/VipSlider/constants';
import '@testing-library/jest-dom';

import { theme } from '@/themes/main';

import { VIPModalProgress } from './VIPModalProgress';

// Mocking required imports
jest.mock('@/core/shared/ProgressBar', () => ({
  ProgressBar: jest.fn(() => <div>ProgressBar</div>),
}));

// Mocking getRankBasedContent function
jest.mock('@/features/VipPage/components/VipSlider/constants', () => ({
  getRankBasedContent: jest.fn(),
}));

// Helper function to render the component
const renderComponent = (rankLevel: number, rankPoint: number) => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>
        <VIPModalProgress rank={{ rankLevel, rankPoint }} />
      </ThemeProvider>
    </IntlProvider>,
  );
};

describe('VIPModalProgress', () => {
  it('displays the correct progress percentage when progress is available', () => {
    const rankLevel = 2;
    const rankPoint = 500;

    // Mocking the getRankBasedContent to return a value with progress
    (getRankBasedContent as jest.Mock).mockReturnValue({
      progress: '50',
      fromLevelContent: 'Level 1',
      toLevelContent: 'Level 2',
      fromLevelIcon: 'fromIcon',
      toLevelIcon: 'toIcon',
    });

    renderComponent(rankLevel, rankPoint);

    // Check if the progress bar is rendered with the correct percentage
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('ProgressBar')).toBeInTheDocument(); // Ensures ProgressBar is rendered
  });

  it('displays the correct level content when progress is available', () => {
    const rankLevel = 2;
    const rankPoint = 500;

    // Mocking the getRankBasedContent to return values with progress
    (getRankBasedContent as jest.Mock).mockReturnValue({
      progress: '50',
      fromLevelContent: 'Level 1',
      toLevelContent: 'Level 2',
      fromLevelIcon: 'fromIcon',
      toLevelIcon: 'toIcon',
    });

    renderComponent(rankLevel, rankPoint);

    // Ensure the correct level content is displayed
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('Level 2')).toBeInTheDocument();
  });

  it('renders the "VIP progress" text', () => {
    const rankLevel = 2;
    const rankPoint = 500;

    renderComponent(rankLevel, rankPoint);

    // Ensure the "Your VIP Progress" text is rendered
    expect(screen.getByText('Your VIP Progress')).toBeInTheDocument();
  });

  it('displays the correct caption text', () => {
    const rankLevel = 2;
    const rankPoint = 500;

    renderComponent(rankLevel, rankPoint);

    // Check if the caption text is correctly rendered
    expect(
      screen.getByText(
        'Your progress is a sum accumulated through your wager on our casino. Increasing through the tiers entitles you to bigger rewards, level up bonus and exclusive VIP treatment.',
      ),
    ).toBeInTheDocument();
  });

  it('displays the level content when progress is empty', () => {
    const rankLevel = 1;
    const rankPoint = 100;

    // Mocking getRankBasedContent to return an empty progress value
    (getRankBasedContent as jest.Mock).mockReturnValue({
      progress: '',
      fromLevelContent: 'Level 1',
      toLevelContent: 'Level 2',
      fromLevelIcon: 'fromIcon',
      toLevelIcon: 'toIcon',
    });

    renderComponent(rankLevel, rankPoint);

    // Ensure the level content is displayed when there is no progress
    expect(screen.queryByText('Level 1')).not.toBeInTheDocument();
    expect(screen.getByText('Level 2')).toBeInTheDocument();
  });
});
