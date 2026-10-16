import { RefObject, useEffect, useState } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | Array<number>;
}

/**
 * Hook to detect when an element enters the viewport using IntersectionObserver
 * @param elementRef - Reference to the element to observe
 * @param options - IntersectionObserver options
 * @returns - Boolean indicating if the element is in view
 */
export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options: IntersectionObserverOptions = {
    threshold: 0,
    rootMargin: '0px',
  },
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isIntersecting;
};
