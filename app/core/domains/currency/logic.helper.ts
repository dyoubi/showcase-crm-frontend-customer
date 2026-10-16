import BigNumber from 'bignumber.js';

import { EFeeType, EstimatedFees, FeeType } from '../wallet';
import { Balance } from '../balance';

export const getCalculatedFees = (
  amount: number | string,
  fees: number | string,
  feeType: FeeType,
  precision: number,
) => {
  const parsedAmount = new BigNumber(amount || 0);
  const parsedFees = new BigNumber(fees || 0);

  if (feeType === EFeeType.PERCENTAGE) {
    const percentageFees = parsedAmount.multipliedBy(parsedFees).div(100).toNumber();

    return Math.ceil(percentageFees * 10 ** precision) / 10 ** precision;
  }

  // feeType === EFeeType.CONSTANT
  return parsedFees.toNumber();
};

export const getMaxRequestedAmount = (
  activeBalance: Balance | undefined,
  estimatedFeesData: EstimatedFees | undefined,
) => {
  if (!activeBalance || !estimatedFeesData) {
    return 0;
  }

  const { precision } = activeBalance;

  const parsedAmount = BigNumber(activeBalance.value || 0)
    .dividedBy(10 ** precision)
    .toNumber();

  const parsedFees = getCalculatedFees(
    parsedAmount,
    estimatedFeesData.feeSettings.value,
    estimatedFeesData.feeSettings.type,
    precision,
  );

  // Max estimated amount will always be the current user balance minus the current fees
  return BigNumber(parsedAmount).minus(parsedFees).toNumber();
};

export const getTotalToWithdraw = (
  estimatedAmount: number | string,
  estimatedFeesData: EstimatedFees | undefined,
  activeBalance: Balance | undefined,
) => {
  if (!estimatedAmount || !estimatedFeesData || !activeBalance) {
    return 0;
  }

  if (estimatedFeesData.feeSettings.type === EFeeType.PERCENTAGE) {
    return BigNumber(estimatedAmount || 0)
      .times(100)
      .dividedBy(100 - estimatedFeesData.feeSettings.value)
      .toString();
  }

  // estimatedFeesData.feeSettings.type === EFeeType.CONSTANT
  return BigNumber(estimatedAmount).plus(estimatedFeesData.feeSettings.value).toString();
};

export const getValueToDisplay = (amount: number | string, toPrecision: number | string, toFixed?: number) => {
  const parsedAmount = BigNumber(amount).toNumber();
  const parsedPrecision = BigNumber(toPrecision).toNumber();

  const actualValue =
    Math.ceil(
      BigNumber(parsedAmount)
        .times(10 ** parsedPrecision)
        .toNumber(),
    ) /
    10 ** parsedPrecision;

  if (!toFixed || toFixed <= 0) {
    return actualValue;
  }

  return Number(actualValue).toFixed(toFixed);
};
