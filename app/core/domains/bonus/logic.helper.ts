import { BonusAssignation } from './types';

export const checkIfReloadBonusIsClaimable = (bonusAssignation: BonusAssignation) => {
  if (!bonusAssignation?.receivedAt) {
    return true;
  }

  const nextClaimableDate = getNextReloadBonusClaimableDate(bonusAssignation);

  return new Date().getTime() > nextClaimableDate.getTime();
};

export const getNextReloadBonusClaimableDate = (bonusAssignation: BonusAssignation) => {
  const { bonus } = bonusAssignation;
  const period = bonus?.parameters?.period || 0;
  const lastClaimDate = new Date(bonusAssignation.receivedAt || 0);
  const nextClaimableDate = new Date(lastClaimDate.getTime() + period);

  return nextClaimableDate;
};
