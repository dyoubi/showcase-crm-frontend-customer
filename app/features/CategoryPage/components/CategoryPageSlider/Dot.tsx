import { MutableRefObject } from 'react';

import * as S from './styles';
import { SliderRef } from './types';

interface DotProps {
  currentPage: number;
  sliderRef: MutableRefObject<SliderRef>;
}

export const Dot = ({ currentPage, sliderRef }: DotProps) => (
  <S.IconPaging onClick={() => sliderRef?.current?.slideTo?.(currentPage)} />
);
