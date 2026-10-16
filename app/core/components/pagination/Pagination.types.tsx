export enum ButtonDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

export type PaginationProps = {
  currentPage: number;
  dataLength: number;
  perPage: number;
  setPage(value: number): void;
  prevText?: string;
  nextText?: string;
};
