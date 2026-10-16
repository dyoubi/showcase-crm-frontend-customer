import { MutableRefObject } from 'react';
import { FormattedMessage } from 'react-intl';

import { SliderRef } from '@/features/VipPage/components/VipSlider/VipSlider.types';

import { ButtonIcon, StyledButton } from './VipButton.styles';

interface VipButtonProps {
  currentIndex: number;
  sliderRef: MutableRefObject<SliderRef>;
}

// 'vip-earlyAdopter',
// 'vip-satoshiEnthusiast',
// 'vip-blockExpert',
// 'vip-luckyMiner',
// 'vip-masterTrader',
// 'vip-whale',
// 'vip-genesisLegend'

export const VipButton = ({ currentIndex, sliderRef }: VipButtonProps) => (
  <StyledButton onClick={() => sliderRef?.current?.slideTo?.(currentIndex)}>
    {currentIndex === 0 && <FormattedMessage id="vip.earlyAdopter" defaultMessage="Early Adopter" />}
    {currentIndex === 1 && <FormattedMessage id="vip.satoshiEnthusiast" defaultMessage="Satoshi Enthusiast" />}
    {currentIndex === 2 && <FormattedMessage id="vip.blockExpert" defaultMessage="Block Expert" />}
    {currentIndex === 3 && <FormattedMessage id="vip.luckyMiner" defaultMessage="Lucky Miner" />}
    {currentIndex === 4 && <FormattedMessage id="vip.masterTrader" defaultMessage="Master Trader" />}
    {currentIndex === 5 && <FormattedMessage id="vip.whale" defaultMessage="Whale" />}
    {currentIndex === 6 && <FormattedMessage id="vip.genesisLegend" defaultMessage="Genesis Legend" />}
  </StyledButton>
);
