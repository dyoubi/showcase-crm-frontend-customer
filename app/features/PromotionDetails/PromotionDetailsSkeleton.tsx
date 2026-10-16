import styled, { css, keyframes } from 'styled-components';

import { ContentContainer } from '@/core/components/Layout';

// Shimmer animation compatible with styled-components v4+
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const shimmerEffect = css`
  animation: ${shimmer} 1.2s ease-in-out infinite;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 104px;
`;

const SkeletonImage = styled.div`
  width: 100%;
  /* Desktop: 1120x440 aspect ratio (440/1120 = 0.393) */
  aspect-ratio: 1120 / 440;
  max-height: 440px;
  border-radius: 12px;
  margin-bottom: 16px;
  ${shimmerEffect}

  @media (max-width: 768px) {
    margin-top: 48px;
    /* Mobile: 360x200 aspect ratio (200/360 = 0.556) */
    aspect-ratio: 360 / 200;
    max-height: 200px;
  }
`;

const SkeletonDateLine = styled.div`
  width: 40%;
  height: 24px;
  border-radius: 4px;
  margin-bottom: 36px;
  ${shimmerEffect}
`;

const SkeletonTitle = styled.div`
  width: 80%;
  height: 32px;
  border-radius: 4px;
  margin-bottom: 24px;
  ${shimmerEffect}
`;

const SkeletonText = styled.div<{ width?: string }>`
  width: ${(props) => props.width || '100%'};
  height: 16px;
  border-radius: 4px;
  margin-bottom: 12px;
  ${shimmerEffect}
`;

const SkeletonTextBlock = styled.div`
  margin-bottom: 48px;
`;

export const PromotionDetailsSkeleton = () => {
  return (
    <ContentContainer>
      <SkeletonImage />
      <SkeletonDateLine />
      <SkeletonTitle />
      <SkeletonTextBlock>
        <SkeletonText />
        <SkeletonText width="95%" />
        <SkeletonText width="88%" />
        <SkeletonText width="92%" />
        <SkeletonText width="85%" />
        <SkeletonText width="90%" />
        <SkeletonText width="87%" />
        <SkeletonText width="93%" />
      </SkeletonTextBlock>
      <SkeletonTextBlock>
        <SkeletonText width="60%" />
        <SkeletonText width="70%" />
        <SkeletonText width="65%" />
        <SkeletonText width="55%" />
      </SkeletonTextBlock>
    </ContentContainer>
  );
};
