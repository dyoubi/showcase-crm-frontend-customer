import { ReactNode, useEffect } from 'react';
import * as Intercom from 'react-use-intercom';
import { useSession } from 'next-auth/react';

import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';
import { Player } from '@/core/domains/player';
import { useUpdateEffect } from '@/core/hooks/useUpdateEffect';

import { CustomChatIcon } from './styles';
import { IntercomLogo } from './IntercomLogo';

interface IntercomProviderProps {
  children?: ReactNode;
}

// eslint-disable-next-line react/no-unused-prop-types
const HandleIntercom = ({ email, player }: { email?: string; player: Player | null | undefined }) => {
  const { boot, hardShutdown, update } = Intercom.useIntercom();

  useUpdateEffect(() => {
    if (!email) {
      hardShutdown();
      boot();
    } else if (player) {
      update({
        userId: player?.id,
        name: `${player?.firstname} ${player?.lastname}`,
        customAttributes: {
          zipcode: player?.address?.postalCode,
          player_city: player?.address?.city,
          player_country: player?.address?.country,
          birthdate: player?.birthdate,
          username: player?.username,
          vip_rank: player?.stats?.rankLevel,
          marketing_acceptance: player?.marketingAcceptation,
          player_status: player?.status,
        },
      });
    }
  }, [email]);

  return null;
};

export const IntercomProvider = ({ children }: IntercomProviderProps) => {
  const player = useSession();
  const email = player?.data?.player?.email;

  useEffect(() => {
    window.intercomSettings = {
      app_id: 'ki6c7d6o',
      custom_launcher_selector: '#iconMessenger',
      hide_default_launcher: true,
    };
  }, []);

  return (
    <Intercom.IntercomProvider
      autoBootProps={{
        email,
      }}
      autoBoot
      appId="ki6c7d6o"
    >
      <HandleIntercom email={email} player={player?.data?.player} />
      {children}
      <CustomChatIcon icon={<IntercomLogo />} size={ButtonSize.Medium} color={ButtonColor.Primary} id="iconMessenger" />
    </Intercom.IntercomProvider>
  );
};
