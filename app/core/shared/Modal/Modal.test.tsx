import React from 'react';

import { render, screen, userEvent } from '@/utils/testHelpers';

import { Modal } from './Modal';

describe('Modal Component', () => {
  let setIsOpen: jest.Mock;

  beforeEach(() => {
    setIsOpen = jest.fn();
  });

  it('should render correctly when open', () => {
    const { getByText, getByTestId } = render(
      <Modal isOpen setIsOpen={setIsOpen} header="Test Header">
        <div>Test Content</div>
      </Modal>,
    );

    expect(getByText('Test Header')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
    expect(getByTestId('bp-modal-title')).toBeInTheDocument();
  });

  it('should only render hasCloseButton when defined but no header', () => {
    const { getByTestId } = render(
      <Modal isOpen setIsOpen={setIsOpen} hasCloseButton>
        <div>Test Content</div>
      </Modal>,
    );

    expect(getByTestId('bp-modal-close_button')).toBeInTheDocument();
    expect(getByTestId('bp-modal-title_space')).toBeInTheDocument();
  });

  it('should render header title when defined', () => {
    const { getByTestId } = render(
      <Modal isOpen setIsOpen={setIsOpen} header="Test Title">
        <div>Test Content</div>
      </Modal>,
    );

    expect(getByTestId('bp-modal-title')).toBeInTheDocument();
  });

  it('should render custom header when defined', () => {
    const { getByTestId } = render(
      <Modal isOpen setIsOpen={setIsOpen} header={<p data-testid="bp-modal-custom_title">Test Title</p>}>
        <div>Test Content</div>
      </Modal>,
    );

    expect(getByTestId('bp-modal-custom_title')).toBeInTheDocument();
  });

  it('should not render header when is not defined', () => {
    render(
      <Modal isOpen setIsOpen={setIsOpen} hasCloseButton={false}>
        <div>Test Content</div>
      </Modal>,
    );

    expect(screen.queryByTestId('bp-modal-header')).not.toBeInTheDocument();
  });

  it('should not render when closed', () => {
    const { queryByText } = render(
      <Modal isOpen={false} setIsOpen={setIsOpen} header="Test Header">
        <div>Test Content</div>
      </Modal>,
    );

    expect(queryByText('Test Header')).not.toBeInTheDocument();
    expect(queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('should call setIsOpen with false when close button is clicked', () => {
    const { getByRole } = render(
      <Modal isOpen setIsOpen={setIsOpen} hasCloseButton>
        <div>Test Content</div>
      </Modal>,
    );

    userEvent.click(getByRole('button')).then(() => {
      expect(setIsOpen).toHaveBeenCalledWith(false);
    });
  });

  it('should call setIsOpen with false when overlay is clicked', () => {
    const { getByTestId } = render(
      <Modal isOpen setIsOpen={setIsOpen}>
        <div>Test Content</div>
      </Modal>,
    );

    userEvent.click(getByTestId('bp-modal-overlay')).then(() => {
      expect(setIsOpen).toHaveBeenCalledWith(false);
    });
  });

  it('should not close when clicking inside the modal', () => {
    const { getByText } = render(
      <Modal isOpen setIsOpen={setIsOpen}>
        <div>Test Content</div>
      </Modal>,
    );

    userEvent.click(getByText('Test Content'));
    expect(setIsOpen).not.toHaveBeenCalled();
  });

  it('should render header title when defined', () => {
    const { getByText } = render(
      <Modal isOpen setIsOpen={setIsOpen} header="Test Title">
        <div>Test Content</div>
      </Modal>,
    );

    userEvent.click(getByText('Test Title'));
    expect(setIsOpen).not.toHaveBeenCalled();
  });
});
