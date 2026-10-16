import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/themes/main';

import { Pagination } from './Pagination';
import { PaginationProps } from './Pagination.types';

describe('Pagination Component', () => {
  const mockSetPage = jest.fn();

  const renderPagination = (props: PaginationProps) =>
    render(
      <ThemeProvider theme={theme}>
        <Pagination {...props} setPage={mockSetPage} />
      </ThemeProvider>,
    );

  beforeEach(() => {
    mockSetPage.mockClear();
  });

  it('renders pagination buttons', () => {
    renderPagination({
      currentPage: 1,
      dataLength: 20,
      perPage: 5,
      prevText: 'Previous',
      nextText: 'Next',
      setPage: mockSetPage,
    });

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables the previous button on the first page', () => {
    renderPagination({
      currentPage: 1,
      dataLength: 20,
      perPage: 5,
      prevText: 'Previous',
      nextText: 'Next',
      setPage: mockSetPage,
    });

    const prevButton = screen.getByText('Previous');

    expect(prevButton).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    renderPagination({
      currentPage: 4,
      dataLength: 20,
      perPage: 5,
      prevText: 'Previous',
      nextText: 'Next',
      setPage: mockSetPage,
    });

    const nextButton = screen.getByText('Next');

    expect(nextButton).toBeDisabled();
  });

  it('calls setPage when the previous button is clicked', () => {
    renderPagination({
      currentPage: 2,
      dataLength: 20,
      perPage: 5,
      prevText: 'Previous',
      nextText: 'Next',
      setPage: mockSetPage,
    });

    const prevButton = screen.getByText('Previous');

    fireEvent.click(prevButton);

    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('calls setPage when the next button is clicked', () => {
    renderPagination({
      currentPage: 1,
      dataLength: 20,
      perPage: 5,
      prevText: 'Previous',
      nextText: 'Next',
      setPage: mockSetPage,
    });

    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);

    expect(mockSetPage).toHaveBeenCalledWith(2);
  });

  it('renders icons if no text is provided for buttons', () => {
    renderPagination({
      currentPage: 1,
      dataLength: 20,
      perPage: 5,
      setPage: mockSetPage,
    });

    expect(screen.getByTestId('icon-arrow-left')).toBeInTheDocument();
    expect(screen.getByTestId('icon-arrow-right')).toBeInTheDocument();
  });

  it('renders custom prevText and nextText', () => {
    renderPagination({
      currentPage: 1,
      dataLength: 20,
      perPage: 5,
      prevText: 'Go Back',
      nextText: 'Go Forward',
      setPage: mockSetPage,
    });

    expect(screen.getByText('Go Back')).toBeInTheDocument();
    expect(screen.getByText('Go Forward')).toBeInTheDocument();
  });
});
