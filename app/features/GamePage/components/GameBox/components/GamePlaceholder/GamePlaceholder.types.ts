import { MachineView, PlayPayloadSlice } from '@/core/domains/machineView';
import { Tag } from '@/core/domains/tag';

export type GamePlaceholderProps = {
  provider: string;
  tags: ReadonlyArray<Tag>;
  title: string;
  rating: string;
  imagePath: string;
  runGame: (options: PlayPayloadSlice) => void;
  gameDetails?: MachineView;
  isLoading: boolean;
};
