export interface RegisterFormProps {
  setIsModalOpen: (newState: boolean) => void;
}

export interface RegisterFormType {
  username?: string;
  email?: string;
  password?: string;
  birthDate?: string;
  terms?: boolean;
  policy?: boolean;
  marketingAcceptation?: boolean;
}

export interface RegisterFormRequest {
  birth: string;
  email: string;
  locale: string;
  marketingAcceptation: boolean;
  metadata: {
    affiliateId?: string;
    affiliateToken?: string;
  };
  password: string;
  username: string;
}

export interface RegisterFormResponse {
  userId: string;
}
