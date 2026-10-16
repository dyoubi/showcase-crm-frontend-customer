import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';

import { EllipsizedTextWrapper } from './EllipsizedText.styles';
import { EllipsizedTextProps } from './EllipsizedText.types';

const ellipsize = (text: string, maxLength: number): string => {
  const ellipsis = '...';
  const textLeft: Array<string> = [];
  const textRight: Array<string> = [];

  Object.values(text).forEach((letter, letterIndex) => {
    const currentTextLength = textLeft.length + ellipsis.length + textRight.length;

    if (currentTextLength < maxLength && currentTextLength < text.length) {
      textLeft.push(letter);
      textRight.unshift(text[text.length - letterIndex]);
    }
  });

  return `${textLeft.join('')}${ellipsis}${textRight.join('')}`;
};

export const EllipsizedText: FC<EllipsizedTextProps> = ({ children, maxLength }) => {
  const [ellipsizedText, setEllipsizedText] = useState<string>(children);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const averageLetterWidth = useRef<number>(0);

  const handleTextChange = useCallback(
    (width: number) => {
      const lettersCanFit = Math.floor(width / averageLetterWidth.current);

      const text = ellipsize(children, maxLength ? Math.min(maxLength, lettersCanFit) : lettersCanFit);

      if (lettersCanFit >= children.length) {
        setEllipsizedText(children);
      } else {
        setEllipsizedText(text);
      }
    },
    [children, maxLength],
  );

  const handleParentResize = useCallback<ResizeObserverCallback>(
    (entries: Array<ResizeObserverEntry>) => {
      const [entry] = entries;
      const { inlineSize } = entry.contentBoxSize[0];

      handleTextChange(inlineSize);
    },
    [handleTextChange],
  );

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      averageLetterWidth.current = wrapperRef.current.scrollWidth / children.length;

      const isTextWiderThanContainer = wrapperRef.current.scrollWidth > wrapperRef.current.offsetWidth;

      if (isTextWiderThanContainer) {
        handleTextChange(wrapperRef.current.offsetWidth);
      }
    }
  }, [children, handleParentResize, handleTextChange]);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(handleParentResize);
    const parentElement = wrapperRef?.current;

    if (parentElement) {
      resizeObserver.observe(parentElement);
    }

    return () => {
      if (parentElement) {
        resizeObserver.unobserve(parentElement);
      }
    };
  }, [handleParentResize, wrapperRef]);

  return <EllipsizedTextWrapper ref={wrapperRef}>{ellipsizedText}</EllipsizedTextWrapper>;
};
