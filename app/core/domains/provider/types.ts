import { MachineView } from '../machineView';

export type GetProvidersResponse = ReadonlyArray<{
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  key: string;
  name: string;
  operatorId: string;
  aggregatorName: string;
  description: string;
  activate: boolean;
  position: number;
  image: {
    desktop: {
      url?: string;
    };
  };
  casinoId: string;
}>;

export type GetProviderMachineViewsResponse = ReadonlyArray<MachineView>;
