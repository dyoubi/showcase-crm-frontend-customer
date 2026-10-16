import { Settings } from 'react-slick';

import { MachineView } from '@/core/domains/machineView';

export type ResultCarouselProps = Settings & {
  results?: ReadonlyArray<MachineView>;
  customSlidesToShow?: number;
};
