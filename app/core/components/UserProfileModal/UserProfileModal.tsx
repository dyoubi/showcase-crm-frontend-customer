import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { selectIsUserProfileModalOpen, toggleUserProfileModal } from '@/core/store/metaSlice';
import { useGetPlayerQuery } from '@/core/domains/player';
import { Modal, ProgressBar } from '@/core/shared';
import { Text } from '@/core/components/Typography';
import { useGetFavoriteMachinesViewQuery } from '@/core/domains/machineView';
import { BuiltInCategoriesSlugsEnum, useGetCategoriesQuery } from '@/core/domains/category';
import { routePaths } from '@/core/constants/routes';
import { UIDateFormatsByLanguage } from '@/core/constants/constants';

import { RankBasedContent } from '@/features/VipPage/components/VipSlider/VipSlider.types';
import { getRankBasedContent } from '@/features/VipPage/components/VipSlider/constants';

import { formatDateString } from '@/utils/date';

import { Heading } from '../Typography';
import { Divider } from '../../shared/Divider';
import {
  Date,
  GameStatsContainer,
  ProfileCaption,
  ProfileHeader,
  ProfileModalContainer,
  Row,
  ThumbnailWrapper,
  TopWinnerGamesContainer,
} from './UserProfileModal.styles';
import { Thumbnail } from '../Thumbnail';

export const UserProfileModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsUserProfileModalOpen);
  const { formatMessage, locale } = useIntl();
  const urlDateFormat = UIDateFormatsByLanguage[locale as string] || UIDateFormatsByLanguage.default;
  const { data } = useGetPlayerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { favoritesMachinesViews } = useGetFavoriteMachinesViewQuery(undefined, {
    selectFromResult: (result) => ({
      favoritesMachinesViews: (result?.data || []).map(({ subject }) => subject),
    }),
  });

  const { category } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data: allcats }) => ({
      category: allcats?.find((cat) => cat.key === BuiltInCategoriesSlugsEnum.RECOMMANDED),
    }),
  });

  const recomendedMachinesViews = category?.machinesViews || [];

  const [playerVipData, setPlayerVipData] = useState<RankBasedContent | null>(null);

  const setIsOpen = useCallback(() => {
    dispatch(toggleUserProfileModal());
  }, [dispatch]);

  useEffect(() => {
    if (data?.stats) {
      setPlayerVipData(getRankBasedContent(data.stats?.rankPoint, data.stats?.rankLevel));
    }
  }, [data]);

  return (
    <Modal
      fullWidth
      header={formatMessage({
        id: 'profile.header',
        defaultMessage: 'Profile',
      })}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <ProfileModalContainer>
        {playerVipData?.fromLevelIcon}
        <Heading size="h4">{playerVipData?.fromLevelContent}</Heading>

        <ProfileHeader>
          <Heading size="h5">{data?.nickname}</Heading>
        </ProfileHeader>

        {data?.createdAt && (
          <ProfileCaption>
            <FormattedMessage id="profile.joinedOn" defaultMessage="Joined on" />{' '}
            <Date>{formatDateString(data?.createdAt, urlDateFormat, locale)}</Date>
          </ProfileCaption>
        )}
        {playerVipData?.progress && (
          <>
            <Row>
              <Text level="small">
                <FormattedMessage id="vipModal.yourProgressValue" defaultMessage="Your VIP Progress" />
              </Text>
              <Text level="small">{+playerVipData.progress}%</Text>
            </Row>
            <ProgressBar progress={+playerVipData.progress} />
          </>
        )}
        <Divider width={200} m="m" />

        {favoritesMachinesViews?.length > 0 ? (
          <GameStatsContainer>
            <Heading size="h5" align="left">
              {formatMessage({
                id: 'favorites',
                defaultMessage: 'Favorites',
              })}
            </Heading>
            <TopWinnerGamesContainer>
              {favoritesMachinesViews?.slice(0, 3)?.map((item) => (
                <ThumbnailWrapper key={item.id}>
                  <Link href={`${routePaths.game}/${item.key}`} onClick={setIsOpen}>
                    <Thumbnail
                      title={item.title}
                      slug={item.key}
                      src={{
                        desktop: item.image?.desktop?.url,
                        mobile: item.image?.mobile?.url,
                      }}
                    />
                  </Link>
                </ThumbnailWrapper>
              ))}
            </TopWinnerGamesContainer>
          </GameStatsContainer>
        ) : (
          <GameStatsContainer>
            <Heading size="h5" align="left">
              {formatMessage({
                id: 'carousel.recommended',
                defaultMessage: 'Bitplay Picks',
              })}
            </Heading>
            <TopWinnerGamesContainer>
              {recomendedMachinesViews?.slice(0, 3)?.map((item) => (
                <ThumbnailWrapper key={item.id}>
                  <Link href={`${routePaths.game}/${item.key}`} onClick={setIsOpen}>
                    <Thumbnail
                      title={item.title}
                      slug={item.key}
                      src={{
                        desktop: item.image?.desktop?.url,
                        mobile: item.image?.mobile?.url,
                      }}
                    />
                  </Link>
                </ThumbnailWrapper>
              ))}
            </TopWinnerGamesContainer>
          </GameStatsContainer>
        )}
      </ProfileModalContainer>
    </Modal>
  );
};
