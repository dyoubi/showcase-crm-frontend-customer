import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';

import { VIP_TIERS } from '@/features/VipPage/components/VipSlider/constants';

import { theme } from '@/themes/main';

import { VIPModalBenefits } from './VIPModalBenefits';

// Mock required imports
jest.mock('@/core/components/Accordion', () => ({
  Accordion: jest.fn(({ title, children }) => (
    <div data-testid="accordion">
      <div>{title}</div>
      <div>{children}</div>
    </div>
  )),
}));

jest.mock('@/features/VipPage/components/VipSlider/VipCard/VipCard', () => ({
  VIPCard: jest.fn(() => <div>VIPCard</div>),
}));

// Helper to render the component
const renderComponent = () => {
  return render(
    <IntlProvider locale="en">
      <ThemeProvider theme={theme}>
        <VIPModalBenefits />
      </ThemeProvider>
    </IntlProvider>,
  );
};

describe('VIPModalBenefits', () => {
  it('renders the correct number of Accordion components', () => {
    renderComponent();

    // Ensure that the number of Accordion components rendered is equal to the length of VipArticles
    expect(screen.getAllByTestId('accordion')).toHaveLength(VIP_TIERS.length);
  });

  it('renders the VIPCard component inside each Accordion', () => {
    renderComponent();

    // Ensure each Accordion contains the VIPCard component
    VIP_TIERS.forEach((article) => {
      // Check that VIPCard is rendered with the correct props
      expect(screen.getAllByText('VIPCard')[0]).toBeInTheDocument();
    });
  });
});
