import { cleanup, fireEvent, screen } from '@testing-library/react';

import { render } from '@/utils/testHelpers';

import { AccordionProps } from './Accordion.types';

import { Accordion } from '.';

const renderDefault = ({ ...rest }: Partial<AccordionProps> = {}) =>
  render(<Accordion {...rest}>Lorem ipsum dolor mit</Accordion>);

const getHeader = () => screen.getByTestId('accordion-header');

const toggleAccordion = () => {
  fireEvent.click(getHeader());
};

describe('Accordion', () => {
  afterEach(cleanup);
  describe('Default', () => {
    it('renders header', () => {
      renderDefault();
      expect(screen.getByTestId('accordion-header'));
    });

    it('opens content correctly', () => {
      renderDefault();
      toggleAccordion();

      const isOpen = getHeader().getAttribute('aria-expanded');

      expect(getHeader()).toHaveAttribute('aria-expanded', isOpen);
      expect(screen.getByTestId('accordion-content'));
    });

    it('opens & close content correctly', () => {
      renderDefault();
      toggleAccordion();

      const isOpen = getHeader().getAttribute('aria-expanded');

      expect(getHeader()).toHaveAttribute('aria-expanded', isOpen);
      expect(screen.getByTestId('accordion-content'));

      toggleAccordion();
      expect(getHeader()).toHaveAttribute('aria-expanded', 'false');
    });

    it('renders with open content ', () => {
      renderDefault();
      toggleAccordion();

      const isOpen = getHeader().getAttribute('aria-expanded');

      expect(getHeader()).toHaveAttribute('aria-expanded', isOpen);
      expect(screen.getByTestId('accordion-content'));
    });
  });
});
