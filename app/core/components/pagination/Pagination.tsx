import { IconArrowLeft, IconArrowRight } from '@/core/shared/Icons';

import { PaginationButton, PaginationContainer } from './Pagination.styles';
import { ButtonDirection, PaginationProps } from './Pagination.types';

export const Pagination = ({ currentPage, dataLength, perPage, setPage, prevText, nextText }: PaginationProps) => {
  const totalPages = Math.ceil(dataLength / perPage);

  return (
    <PaginationContainer>
      <PaginationButton
        type="button"
        disabled={currentPage === 1}
        direction={ButtonDirection.LEFT}
        onClick={() => setPage(currentPage - 1)}
      >
        {prevText || <IconArrowLeft color="currentColor" />}
      </PaginationButton>
      <PaginationButton
        type="button"
        disabled={currentPage >= totalPages}
        direction={ButtonDirection.RIGHT}
        onClick={() => setPage(currentPage + 1)}
      >
        {nextText || <IconArrowRight color="currentColor" />}
      </PaginationButton>
    </PaginationContainer>
  );
};
