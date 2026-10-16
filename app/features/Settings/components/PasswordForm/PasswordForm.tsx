import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@/core/shared/Box';
import { PasswordInput } from '@/core/shared/Input';

import { SettingsContainer, StyledButton, StyledHeading } from '../../Settings.styles';
import { useChangePasswordValidation } from './PasswordForm.validation';
import { ChangePasswordForm } from './PasswordForm.types';

export const PasswordForm = () => {
  const { formatMessage } = useIntl();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    mode: 'onSubmit',
    resolver: yupResolver(useChangePasswordValidation()),
  });
  const onSubmit = async (formData: ChangePasswordForm) => {
    try {
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      return null;
    }
  };

  return (
    <>
      <StyledHeading size="h2">
        <FormattedMessage id="security.password" defaultMessage="Password" />
      </StyledHeading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsContainer>
          <Box mb="xxs">
            <PasswordInput
              {...register('oldPassword')}
              name="oldPassword"
              selectable
              error={errors.oldPassword?.message}
              placeholder={formatMessage({
                id: 'security.oldPassword',
                defaultMessage: 'Old Password',
              })}
            />
          </Box>
          <Box mb="xxs">
            <PasswordInput
              {...register('newPassword')}
              name="newPassword"
              selectable
              error={errors.newPassword?.message}
              placeholder={formatMessage({
                id: 'security.newPassword',
                defaultMessage: 'New Password',
              })}
            />
          </Box>
          <PasswordInput
            {...register('confirmPassword')}
            name="confirmPassword"
            selectable
            error={errors.confirmPassword?.message}
            placeholder={formatMessage({
              id: 'security.confirmPassword',
              defaultMessage: 'Confirm New Password',
            })}
          />
          <StyledButton type="submit" data-mocked>
            <FormattedMessage id="preferences.save" defaultMessage="Save" />
          </StyledButton>
        </SettingsContainer>
      </form>
    </>
  );
};
