import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';

import { Input } from '@/core/shared/Input';
import { Select } from '@/core/shared/Select';
import { SelectSize } from '@/core/shared/Select/Select.types';
import { Button } from '@/core/shared/Button';
import { Caption } from '@/core/components/Typography';
import { Box } from '@/core/shared/Box';

import { StyledHeading } from '../../Settings.styles';
import { EmailForm, PhoneNoForm } from './UserDataForm.types';

export const UserDataForm = () => {
  const { formatMessage } = useIntl();
  const emailForm = useForm({
    mode: 'onSubmit',
  });
  const phoneNoForm = useForm({
    mode: 'onSubmit',
  });

  const onEmailSubmit = async (formData: any) => {
    try {
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      return null;
    }
  };

  const onPhoneNoSubmit = async (formData: any) => {
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
        <FormattedMessage id="email" defaultMessage="Email" />
      </StyledHeading>
      <Box mb="xl" data-mocked>
        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
          <Input
            {...emailForm.register('email')}
            placeholder={formatMessage({
              defaultMessage: 'exem*******@gmail.com',
              id: 'settings.emailPlaceholder',
            })}
            button={
              <Button type="submit">
                <FormattedMessage id="settings.resend" defaultMessage="Resend" />
              </Button>
            }
          />
        </form>
      </Box>
      <StyledHeading size="h2">
        <FormattedMessage id="settings.phoneNumber" defaultMessage="Phone Number" />
      </StyledHeading>
      <Box mb="xs">
        <Caption>
          <FormattedMessage
            id="settingsDisclaimer"
            defaultMessage="We only service areas that are listed in the available country code list."
          />
        </Caption>
      </Box>
      <form onSubmit={phoneNoForm.handleSubmit(onPhoneNoSubmit)}>
        <Box mb="xs" data-mocked>
          <Select
            size={SelectSize.Big}
            placeholder={formatMessage({
              defaultMessage: 'Country Code',
              id: 'settings.countryCode',
            })}
          />
        </Box>
        <Input
          {...phoneNoForm.register('phoneNo')}
          placeholder={formatMessage({
            defaultMessage: 'Phone Number',
            id: 'settings.phonePlaceholder',
          })}
          data-mocked
          button={
            <Button type="submit">
              <FormattedMessage id="settings.save" defaultMessage="Save" />
            </Button>
          }
        />
      </form>
    </>
  );
};
