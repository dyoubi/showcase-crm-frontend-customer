import { PatchPlayerPayload } from '@/core/domains/player';

export type CompleteRegistrationModalProps = {
  isOpen: boolean;
  setIsOpen: () => void;
  isSubmitted?: () => void;
};

export type CountryType = {
  full: string;
  EN: string;
  FR: string;
  code: string;
};

export type CountryDropdownOption = {
  label: string;
  value: string;
};

export interface CompleteRegistrationFormType {
  firstname?: string;
  lastname?: string;
  country?: CountryDropdownOption;
  city?: string;
  zip?: string;
  birthDate?: string;
}

export type UpdateUserRequest = PatchPlayerPayload;
