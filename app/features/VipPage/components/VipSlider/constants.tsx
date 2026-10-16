import { FormattedMessage } from 'react-intl';

import {
  IconBlockExpert,
  IconEarlyAdopter,
  IconGenesisLegend,
  IconLuckyMiner,
  IconMasterTrader,
  IconSatoshiEnthusiast,
  IconVIP3,
  IconWhale,
} from '@/core/shared/Icons';

import { theme } from '@/themes/main';

import { RankBasedContent, VIP_LEVEL_MAX_POINTS, VipLevel } from './VipSlider.types';

export const VIP_TIERS: Array<VipLevel> = [
  {
    articleKey: 'vip-earlyAdopter',
    featureColor: theme.rebrandingColors.gradients.red,
    featuresList: [],
    financialDetails: '$0 - $1,000',
    icon: <IconEarlyAdopter />,
    iconSmall: <IconEarlyAdopter size={36} />,
    id: 'vip-earlyAdopter',
    title: 'Early Adopter',
    titleDefault: 'vip.earlyAdopter',
  },
  {
    articleKey: 'vip-satoshiEnthusiast',
    featureColor: theme.rebrandingColors.gradients.orange,
    featuresList: [],
    financialDetails: '$1,000 - $25,000',
    icon: <IconSatoshiEnthusiast />,
    iconSmall: <IconSatoshiEnthusiast size={36} />,
    id: 'vip-satoshiEnthusiast',
    title: 'Satoshi Enthusiast',
    titleDefault: 'vip.satoshiEnthusiast',
  },
  {
    articleKey: 'vip-blockExpert',
    featureColor: theme.rebrandingColors.gradients.blue,
    featuresList: [],
    financialDetails: '$25,000 - $100,000',
    icon: <IconBlockExpert />,
    iconSmall: <IconBlockExpert size={36} />,
    id: 'vip-blockExpert',
    title: 'Block Expert',
    titleDefault: 'vip.blockExpert',
  },
  {
    articleKey: 'vip-luckyMiner',
    featureColor: theme.rebrandingColors.gradients.green,
    featuresList: [],
    financialDetails: '$100,000 - $500,000',
    icon: <IconLuckyMiner />,
    iconSmall: <IconLuckyMiner size={36} />,
    id: 'vip-luckyMiner',
    title: 'Lucky Miner',
    titleDefault: 'vip.luckyMiner',
  },
  {
    articleKey: 'vip-masterTrader',
    featureColor: theme.rebrandingColors.gradients.yellow,
    featuresList: [],
    financialDetails: '$500,000 - $1,000,000',
    icon: <IconMasterTrader />,
    iconSmall: <IconMasterTrader size={36} />,
    id: 'vip-masterTrader',
    title: 'Master Trader',
    titleDefault: 'vip.masterTrader',
  },
  {
    articleKey: 'vip-whale',
    featureColor: theme.rebrandingColors.gradients.grey,
    featuresList: [],
    financialDetails: '$1,000,000 - $10,000,000',
    icon: <IconWhale />,
    iconSmall: <IconWhale size={36} />,
    id: 'vip-whale',
    title: 'Whale',
    titleDefault: 'vip.whale',
  },
  {
    articleKey: 'vip-genesisLegend',
    featureColor: theme.rebrandingColors.gradients.genesis,
    featuresList: [],
    financialDetails: '$10,000,000 - $100,000,000',
    icon: <IconGenesisLegend />,
    iconSmall: <IconGenesisLegend size={36} />,
    id: 'vip-genesisLegend',
    title: 'Genesis Legend',
    titleDefault: 'vip.genesisLegend',
  },
];

const countPercent = (num: number, max: number) => {
  const percentage = (num / max) * 100;

  return (Math.floor(percentage * 100) / 100).toString();
};

export const getRankBasedContent = (currentPoints: number, ilevel: number): RankBasedContent => {
  const level = ilevel + 1;

  const content = {
    progress: countPercent(currentPoints, VIP_LEVEL_MAX_POINTS.EARLY_ADOPTER),
    fromLevelContent: <FormattedMessage id="vip.earlyAdopter" defaultMessage="Early Adopter" />,
    fromLevelIcon: <IconEarlyAdopter />,
    toLevelContent: <FormattedMessage id="vip.satoshiEnthusiast" defaultMessage="Satoshi Enthusiast" />,
    toLevelIcon: <IconSatoshiEnthusiast />,
  };

  if (level === 1) {
    content.progress = countPercent(currentPoints, VIP_LEVEL_MAX_POINTS.EARLY_ADOPTER);
    content.fromLevelContent = <FormattedMessage id="vip.earlyAdopter" defaultMessage="Early Adopter" />;
    content.toLevelContent = <FormattedMessage id="vip.satoshiEnthusiast" defaultMessage="Satoshi Enthusiast" />;
    content.fromLevelIcon = <IconEarlyAdopter />;
    content.toLevelIcon = <IconSatoshiEnthusiast />;
  }

  if (level === 2) {
    content.progress = countPercent(currentPoints, VIP_LEVEL_MAX_POINTS.SATOSHI_ENTHUSIAST);
    content.fromLevelContent = <FormattedMessage id="vip.satoshiEnthusiast" defaultMessage="Satoshi Enthusiast" />;
    content.toLevelContent = <FormattedMessage id="vip.blockExpert" defaultMessage="Block Expert" />;
    content.fromLevelIcon = <IconSatoshiEnthusiast />;
    content.toLevelIcon = <IconBlockExpert />;
  }

  if (level === 3) {
    content.progress = countPercent(currentPoints, VIP_LEVEL_MAX_POINTS.BLOCK_EXPERT);
    content.fromLevelContent = <FormattedMessage id="vip.blockExpert" defaultMessage="Block Expert" />;
    content.toLevelContent = <FormattedMessage id="vip.luckyMiner" defaultMessage="Lucky Miner" />;
    content.fromLevelIcon = <IconBlockExpert />;
    content.toLevelIcon = <IconLuckyMiner />;
  }

  if (level === 4) {
    content.progress = countPercent(currentPoints, VIP_LEVEL_MAX_POINTS.LUCKY_MINER);
    content.fromLevelContent = <FormattedMessage id="vip.luckyMiner" defaultMessage="Lucky Miner" />;
    content.toLevelContent = <FormattedMessage id="vip.masterTrader" defaultMessage="Master Trader" />;
    content.fromLevelIcon = <IconLuckyMiner />;
    content.toLevelIcon = <IconMasterTrader />;
  }

  if (level === 5) {
    content.progress = countPercent(currentPoints, VIP_LEVEL_MAX_POINTS.MASTER_TRADER);
    content.fromLevelContent = <FormattedMessage id="vip.masterTrader" defaultMessage="Master Trader" />;
    content.toLevelContent = <FormattedMessage id="vip.whale" defaultMessage="Whale" />;
    content.fromLevelIcon = <IconMasterTrader />;
    content.toLevelIcon = <IconWhale />;
  }

  if (level === 6) {
    content.progress = countPercent(currentPoints, VIP_LEVEL_MAX_POINTS.WHALE);
    content.fromLevelContent = <FormattedMessage id="vip.whale" defaultMessage="Whale" />;
    content.toLevelContent = <FormattedMessage id="vip.genesisLegend" defaultMessage="Genesis Legend" />;
    content.fromLevelIcon = <IconWhale />;
    content.toLevelIcon = <IconGenesisLegend />;
  }

  if (level > 6) {
    content.progress = '';
    content.fromLevelContent = <FormattedMessage id="vip.genesisLegend" defaultMessage="Genesis Legend" />;
    content.toLevelContent = <FormattedMessage id="vip.genesisLegend" defaultMessage="Genesis Legend" />;
    content.fromLevelIcon = <IconGenesisLegend />;
    content.toLevelIcon = <IconGenesisLegend />;
  }

  return content;
};
