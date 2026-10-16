export interface ProviderSelectorProps {
  onFilter: (providerNames: Array<string>) => void;
  onToggle?: (isOpen: boolean) => void;
  fullWidth?: boolean;
  isOpen?: boolean;
  selectedProvidersByDefault?: Array<string>;
  toggleOnClickOutside?: boolean;
}
