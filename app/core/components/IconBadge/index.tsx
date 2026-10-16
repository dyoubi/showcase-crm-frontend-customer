import { createElement } from 'react';
import _ from 'lodash';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import * as c from './constants';

interface IconBadgeProps {
  level?: string | number;
}

export const IconBadge = ({ level }: IconBadgeProps) => {
  const { isTabletOrPhone } = useBreakpoints();

  if (_.isNil(level) || !c.IconBadgeMap[level.toString()]) {
    return null;
  }

  return createElement(c.IconBadgeMap[level.toString()], { size: isTabletOrPhone ? 'xl' : 'xxl' });
};
