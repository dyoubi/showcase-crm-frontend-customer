export interface ProviderConfig {
  label: string;
  value: string;
  status: boolean; // true = active, false = inactive
  description?: string;
}

// Provider configuration with status control
export const providersConfig: Array<ProviderConfig> = [
  {
    label: 'Banxa',
    value: 'banxa',
    status: true,
    description: 'Support for cards and bank transfers',
  },
  {
    label: 'Moonpay',
    value: 'moonpay',
    status: true,
    description: 'Support for cards and various payment methods',
  },
  {
    label: 'Transak',
    value: 'transak',
    status: true,
    description: 'Support for cards and bank transfers',
  },
  {
    label: 'Wert',
    value: 'wert',
    status: true,
    description: 'Support for cards and Apple/Google Pay',
  },
  {
    label: 'Kado',
    value: 'kado',
    status: false, // Disabled - not working from Changelly side
    description: 'Currently unavailable',
  },
  {
    label: 'Skrill Crypto',
    value: 'skrill_crypto',
    status: false, // Disabled - not working from Changelly side
    description: 'Currently unavailable',
  },
];

// Get only active providers
export const getActiveProviders = (): Array<ProviderConfig> => {
  return providersConfig.filter((provider) => provider.status);
};

// Helper functions
export const getProviderByValue = (value: string): ProviderConfig | undefined => {
  return providersConfig.find((provider) => provider.value === value);
};

export const isProviderActive = (value: string): boolean => {
  const provider = getProviderByValue(value);

  return provider?.status ?? false;
};
