import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { selectActiveReloadBonus, selectIsVIPModalOpen, toggleVIPModal } from '@/core/store/metaSlice';
import { BonusAssignation, selectLatestBonus, useGetPlayerBonusesQuery } from '@/core/domains/bonus';
import { routePaths } from '@/core/constants/routes';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';

import { Box } from '../../shared/Box';
import { ButtonGroup } from '../../shared/ButtonGroup';
import { Divider } from '../../shared/Divider';
import { StyledModal, TabButton, TabContainer, VIPFooter } from './VIPModal.styles';
import { VIPModalTab } from './VIPModal.types';
import { VIPModalBenefits } from './VIPModalBenefits/VIPModalBenefits';
import { VIPModalProgress } from './VIPModalProgress/VIPModalProgress';
import { BonusClaimContent } from '../BonusClaimModal/BonusClaimContent';
import { ReloadClaimContent } from '../BonusClaimModal/ReloadClaimContent';

export const VIPModal: FC = () => {
  const dispatch = useAppDispatch();
  const { formatMessage, locale } = useIntl();
  const [selectedTab, setSelectedTab] = useState<VIPModalTab>(VIPModalTab.Vip);
  const [reloadBonussesAssigned, setReloadBonussesAssigned] = useState<Array<BonusAssignation>>([]);
  const [onlyBonussesAssigned, setOnlyBonussesAssigned] = useState<Array<BonusAssignation>>([]);
  const activeReloadBonus = useAppSelector(selectActiveReloadBonus);
  const isOpen = useAppSelector(selectIsVIPModalOpen);
  const { data: session } = useSession();
  const { data: bonusesAssigned, refetch } = useGetPlayerBonusesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const setIsOpen = useCallback(() => {
    dispatch(toggleVIPModal());
  }, [dispatch]);

  const closeModal = () => {
    dispatch(toggleVIPModal());
  };

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  useEffect(() => {
    if (bonusesAssigned) {
      setOnlyBonussesAssigned(bonusesAssigned.filter((bonusItem) => bonusItem?.bonus?.type !== 'reload'));
      setReloadBonussesAssigned(bonusesAssigned.filter((bonusItem) => bonusItem?.bonus?.type === 'reload'));
    }
  }, [bonusesAssigned]);

  // Safe handling of bonusesAssigned
  const lastBonus = bonusesAssigned ? selectLatestBonus(bonusesAssigned) : undefined;
  const hasOneBonusToClaim = !!lastBonus;

  // Set the selected tab to Bonus if there is a bonus assigned
  useEffect(() => {
    if (isOpen) {
      if (hasOneBonusToClaim) {
        setSelectedTab(VIPModalTab.Bonus);
      } else {
        setSelectedTab(VIPModalTab.Vip);
      }
    }
  }, [isOpen, hasOneBonusToClaim]);

  return (
    <StyledModal
      header={formatMessage({
        defaultMessage: 'VIP',
        id: 'vipModal.header',
      })}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <TabContainer>
        <ButtonGroup>
          <TabButton
            color={ButtonColor.Tertiary}
            size={ButtonSize.Block}
            isSelected={selectedTab === VIPModalTab.Vip}
            onClick={() => setSelectedTab(VIPModalTab.Vip)}
          >
            <FormattedMessage id="vipModal.header" defaultMessage="VIP" />
          </TabButton>
          <TabButton
            color={ButtonColor.Tertiary}
            size={ButtonSize.Block}
            isSelected={selectedTab === VIPModalTab.Benefits}
            onClick={() => setSelectedTab(VIPModalTab.Benefits)}
          >
            <FormattedMessage id="vipModal.benefits" defaultMessage="Benefits" />
          </TabButton>
          {onlyBonussesAssigned.length > 0 && (
            <TabButton
              isSelected={selectedTab === VIPModalTab.Bonus}
              onClick={() => setSelectedTab(VIPModalTab.Bonus)}
              size={ButtonSize.Block}
              color={ButtonColor.Tertiary}
            >
              <FormattedMessage id="vipModal.bonus" defaultMessage="Bonus" />
            </TabButton>
          )}
          {(reloadBonussesAssigned.length > 0 || activeReloadBonus) && (
            <TabButton
              isSelected={selectedTab === VIPModalTab.Reload}
              onClick={() => setSelectedTab(VIPModalTab.Reload)}
              size={ButtonSize.Block}
              color={ButtonColor.Tertiary}
            >
              <FormattedMessage id="vipModal.reload" defaultMessage="Reload" />
            </TabButton>
          )}
        </ButtonGroup>
      </TabContainer>
      <Box mt="m">
        {session?.player?.stats && selectedTab === VIPModalTab.Vip && <VIPModalProgress rank={session.player.stats} />}
        {selectedTab === VIPModalTab.Benefits && <VIPModalBenefits />}
        {selectedTab === VIPModalTab.Bonus && <BonusClaimContent />}
        {selectedTab === VIPModalTab.Reload && <ReloadClaimContent />}
      </Box>
      <Divider center m="l" width={200} />
      <VIPFooter>
        <Link href={locale === 'en' ? routePaths.vip.en : routePaths.vip.fr} onClick={() => closeModal()}>
          <FormattedMessage id="vipModal.learnMore" defaultMessage="Learn more about our VIP program" />
        </Link>
      </VIPFooter>
    </StyledModal>
  );
};
