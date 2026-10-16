import { ReactNode, useRef } from 'react';

import { useIntersectionObserver } from '@/core/hooks/useIntersectionObserver';

interface LazyLoadProps {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Component that lazily renders its children when they come into view
 * Uses IntersectionObserver to detect when the component is in the viewport
 */
export const LazyLoad = ({ children, rootMargin = '100px 0px', threshold = 0 }: LazyLoadProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, { rootMargin, threshold });

  return (
    <div ref={ref} style={{ minHeight: '100px' }}>
      {isInView ? children : null}
    </div>
  );
};
