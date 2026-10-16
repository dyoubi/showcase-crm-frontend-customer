import { MachineView } from '@/core/domains/machineView';

export type GameFooterProps = {
  onFullScreenClick: () => void;
  onWideScreen: () => void;
  onHomeClick: () => void;
  onPlaymodeToggle?: () => void;
  gameDetails?: MachineView;
};
