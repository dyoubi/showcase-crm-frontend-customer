export interface LoginFormProps {
  setIsModalOpen: (newState: boolean) => void;
  onPasswordForgottenClick: () => void;
}

export interface LoginFormRequest {
  email: string;
  password: string;
  remember?: boolean;
}
