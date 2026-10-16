import { MachineView, PlayPayloadSlice } from '@/core/domains/machineView';

export type RunGameButtonsProps = {
  runGame: (options: PlayPayloadSlice) => void;
  gameDetails?: MachineView;
};
