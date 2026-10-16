import { FC } from 'react';

import { IconUser } from '@/core/shared/Icons';

import { trimEnd } from '@/utils/string';

import { TopMenuUserContainer, TopMenuUserName } from './TopMenuUser.styles';

export const TopMenuUser: FC<{ username?: string }> = ({ username = '' }) => (
  <TopMenuUserContainer>
    <IconUser /> <TopMenuUserName>{trimEnd(username, 10)}</TopMenuUserName>
  </TopMenuUserContainer>
);
