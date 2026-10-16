export interface Config {
  publicBackendUrl: string;
  operatorApiKey: string;
  publicMachineScriptUrl: string;
  nextPublicEnv: string;
  nodeEnv: 'production' | 'development';
  isServerSide: boolean;
  casinoId: string;
  casinoKey: string;
  coinsUrl: string;
}
