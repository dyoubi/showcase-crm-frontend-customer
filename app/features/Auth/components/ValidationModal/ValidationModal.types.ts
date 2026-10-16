export type UserRegisterEvent = {
  user_id: string;
  username?: string;
  registration_timestamp: string;
  device: string;
  affiliate_id?: string;
  marketing_opt_in: string;
};

export type ValidationModalProps = {
  isOpen: boolean;
  setIsOpen: (payload: boolean) => void;
  onSubmit: () => void;
  eventData: UserRegisterEvent;
};
