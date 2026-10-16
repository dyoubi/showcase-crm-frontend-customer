import { FormattedMessage } from 'react-intl';
import { useTheme } from 'styled-components';

import { Text } from '@/core/components/Typography';
import { Thumbnail } from '@/core/components/Thumbnail';
import { Tag } from '@/core/shared/Tag';
import { routePaths } from '@/core/constants/routes';
import { DATA_TEST_IDS } from '@/core/constants/constants';
import { IconLoader } from '@/core/shared/Icons';

import {
  Content,
  DetailContainer,
  GameContainer,
  GameTitle,
  Provider,
  Rating,
  RatingAndTagsContainer,
  TagContainer,
  TagLink,
  ThumbnailContainer,
} from './GamePlaceholder.styles';
import { GamePlaceholderProps } from './GamePlaceholder.types';
import { RunGameButtons } from '../RunGameButtons/RunGameButtons';
import { BalanceDropdown } from '../BalanceDropdown/BalanceDropdown';

export const GamePlaceholder = ({
  imagePath,
  provider,
  rating,
  tags,
  title,
  gameDetails,
  runGame,
  isLoading = false,
}: GamePlaceholderProps) => {
  const { rebrandingColors } = useTheme();
  const tagsElement = (tags || [])?.map((tag) => {
    const { name, id } = tag;

    return (
      <TagLink
        data-testid={DATA_TEST_IDS.GAME_TAG_LINK}
        data-tag-name={tag.name}
        data-tag-link={tag.key}
        data-tag-color={tag.color}
        href={`${routePaths.category}/${tag.key || tag.name?.toLowerCase() || ''}`}
        key={id}
      >
        <Tag content={name} color={rebrandingColors.palette.dark[60]} />
      </TagLink>
    );
  });

  return (
    <Content isLoading={isLoading}>
      {isLoading ? (
        <IconLoader size={72} />
      ) : (
        <>
          <GameContainer>
            <ThumbnailContainer>
              <Thumbnail slug={gameDetails?.key || ''} src={{ desktop: imagePath }} title={title} disableHover />
            </ThumbnailContainer>
            <DetailContainer>
              <div>
                <GameTitle level="medium">{title}</GameTitle>
                <Provider level="small">{provider}</Provider>
              </div>

              <RatingAndTagsContainer>
                <Rating>
                  <Text level="small" as="span">
                    <FormattedMessage id="game.rating" values={{ rating }} defaultMessage="{rating}" />
                  </Text>
                </Rating>
                <TagContainer>{tagsElement}</TagContainer>
              </RatingAndTagsContainer>

              <BalanceDropdown />
            </DetailContainer>
          </GameContainer>
          <RunGameButtons gameDetails={gameDetails} runGame={runGame} />
        </>
      )}
    </Content>
  );
};
