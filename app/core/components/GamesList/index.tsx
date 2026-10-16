import { useIntl } from 'react-intl';

import { ContentContainer } from '@/core/components/Layout';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { MachineView } from '@/core/domains/machineView';
import { SearchMachineViewInput } from '@/core/components/SearchMachineViewInput';
import { Box } from '@/core/shared/Box';
import { ProvidersCarousel } from '@/core/components/ProvidersCarousel';
// import { MainPageBets } from '@/core/components/MainPageBets';

import { HeadingMobile, PageHeader, PageHeaderContentContainer, StyledHeading } from './GamesList.styles';
import { GameList } from './components/GameList';

interface GamesListProps {
  headerImageUrl?: string;
  machinesViews: ReadonlyArray<MachineView>;
}

export const GamesList = ({ headerImageUrl, machinesViews }: GamesListProps) => {
  const { formatMessage } = useIntl();
  const { isTabletOrPhone } = useBreakpoints();

  return (
    <>
      <PageHeader img={headerImageUrl}>
        {isTabletOrPhone ? (
          <HeadingMobile>
            {formatMessage({
              id: 'providers',
              defaultMessage: 'Providers',
            })}
          </HeadingMobile>
        ) : (
          <PageHeaderContentContainer>
            <StyledHeading size="h1">
              {formatMessage({
                id: 'providers',
                defaultMessage: 'Providers',
              })}
            </StyledHeading>
          </PageHeaderContentContainer>
        )}
      </PageHeader>
      <ContentContainer
        style={{
          padding: '0 35px 60px',
        }}
      >
        {!isTabletOrPhone && <SearchMachineViewInput />}
        <GameList data={machinesViews} />
        <Box data-mocked>
          <ProvidersCarousel />
        </Box>

        {/* // TODO @BETS: This will be implemented in a different ticket. */}
        {/* <Box mt="l">
          <MainPageBets />
        </Box> */}
      </ContentContainer>
    </>
  );
};
