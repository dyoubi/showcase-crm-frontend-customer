import { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { PromotionBoxWrapper, PromotionHeaderContainer } from './PromotionBox.styles';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBase = styled.div(
  ({ theme }) => css`
    background-color: ${theme.rebrandingColors.palette.gray[20]};
    background-image: linear-gradient(
      90deg,
      ${theme.rebrandingColors.palette.gray[20]} 0px,
      rgba(255, 255, 255, 0.1) 40px,
      ${theme.rebrandingColors.palette.gray[30]} 80px
    );
    background-size: 200px 100%;
    background-repeat: no-repeat;
    animation: ${shimmer} 1.5s infinite linear;
    border-radius: 6px;
  `,
);

const SkeletonImage = styled(SkeletonBase)(
  ({ theme }) => css`
    width: 100%;
    height: 200px; /* Match the fixed height from PromotionImage */
    margin-bottom: ${theme.margin.xxs};

    @media (max-width: 768px) {
      height: 160px; /* Match mobile height */
    }
  `,
);

const SkeletonTitle = styled(SkeletonBase)`
  width: 80%;
  height: 24px;
  margin-bottom: 10px;
`;

const SkeletonSubtitle = styled(SkeletonBase)`
  width: 60%;
  height: 16px;
`;

export const PromotionBoxSkeleton: FC = () => {
  return (
    <PromotionBoxWrapper>
      <SkeletonImage />
      <PromotionHeaderContainer>
        <SkeletonTitle />
        <SkeletonSubtitle />
      </PromotionHeaderContainer>
    </PromotionBoxWrapper>
  );
};
