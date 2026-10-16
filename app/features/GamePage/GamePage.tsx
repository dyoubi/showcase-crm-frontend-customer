import { useSession } from 'next-auth/react';
import Script from 'next/script';

// import { MainPageBets } from '@/core/components/MainPageBets';
import { Box } from '@/core/shared/Box';
import { GamesCarousel } from '@/core/components/GamesCarousel';
import { ContentContainer } from '@/core/components/Layout';
import { config } from '@/core/config';

import { GameBox } from './components/GameBox';

const SCRIPT_URL = config.publicMachineScriptUrl;

export const GamePage = () => {
  useSession();

  return (
    <ContentContainer>
      <Script src={SCRIPT_URL} />
      <GameBox />
      <Box mb="m" mt="s">
        <GamesCarousel categorySlug="recommanded" />
      </Box>

      {/* // TODO @BETS: This will be implemented in a different ticket. */}
      {/* <Box mt="m">
        <MainPageBets />
      </Box> */}
    </ContentContainer>
  );
};
