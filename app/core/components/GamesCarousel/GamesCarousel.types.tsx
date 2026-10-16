import { ReactNode } from 'react';
import { Settings } from 'react-slick';

import { BuiltInCategoriesSlugsTypes } from '@/core/domains/category';

export type GamesCarouselProps = {
  categorySlug: BuiltInCategoriesSlugsTypes;
  icon?: ReactNode;
} & Settings;
