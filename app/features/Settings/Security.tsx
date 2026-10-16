import { PasswordForm } from './components/PasswordForm';
import { TwoFactorForm } from './components/TwoFactorForm';
import { SettingsContainer } from './Settings.styles';

export const Security = () => (
  <SettingsContainer>
    <PasswordForm />
    <TwoFactorForm />
  </SettingsContainer>
);
