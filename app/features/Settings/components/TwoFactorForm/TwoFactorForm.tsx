import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'styled-components';
import QRCode from 'react-qr-code';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Caption } from '@/core/components/Typography';
import { Box } from '@/core/shared/Box';
import { Divider } from '@/core/shared/Divider';
import { Button } from '@/core/shared/Button';
import { Input, PasswordInput } from '@/core/shared/Input';
import { WalletCopyAddressInput } from '@/core/components/WalletModal/WalletModalDeposit/WalletCopyAddressInput/WalletCopyAddressInput';

import { CodeContainer, StyledHeading } from '../../Settings.styles';
import { TwoFactorFormData } from './TwoFactorForm.types';
import { useTwoFactorValidation } from './TwoFactorForm.validation';

export const TwoFactorForm = () => {
  const { formatMessage } = useIntl();
  const { rebrandingColors } = useTheme();

  const hash = 'NNBVGQCDHJJEKTL3ONYCIM3DHRME6PS6GFQWSQTXO5YU4STDIMSA';

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TwoFactorFormData>({
    mode: 'onSubmit',
    resolver: yupResolver(useTwoFactorValidation()),
  });
  const onSubmit = async (formData: TwoFactorFormData) => {
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
        <FormattedMessage id="security.twoFactor" defaultMessage="Two Factor" />
      </StyledHeading>
      <Box mb="xxs">
        <Caption>
          <FormattedMessage
            id="security.description"
            defaultMessage="To keep your account extra secure leave a two factor authentication enabled."
          />
        </Caption>
        <Divider mb="xxs" mt="xxs" />
        <Caption>
          <FormattedMessage id="security.instruction" defaultMessage="Copy this code to your authenticator app" />
        </Caption>
      </Box>
      <Box data-mocked>
        <WalletCopyAddressInput value={hash} />
      </Box>
      <Box mt="xxs" mb="xxs">
        <Caption>
          <FormattedMessage id="security.warning" defaultMessage="Don't show this code!" />
        </Caption>
      </Box>
      <CodeContainer>
        <QRCode bgColor={rebrandingColors.backgroundColor} fgColor={rebrandingColors.palette.light[40]} value={hash} />
      </CodeContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="xxs">
          <PasswordInput
            {...register('password')}
            error={errors.password?.message}
            selectable
            placeholder={formatMessage({
              id: 'security.password',
              defaultMessage: 'Password',
            })}
          />
        </Box>
        <Box mb="xl">
          <Input
            {...register('code')}
            error={errors.code?.message}
            placeholder={formatMessage({
              defaultMessage: 'Two Factor Code',
              id: 'security.code',
            })}
            button={
              <Button type="submit" data-mocked>
                <FormattedMessage id="security.enable" defaultMessage="Enable" />
              </Button>
            }
          />
        </Box>
      </form>
    </>
  );
};
