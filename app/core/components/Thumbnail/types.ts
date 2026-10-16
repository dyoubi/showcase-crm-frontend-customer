import { NativeDivProps } from '@/utils/typescript';

export interface TitleLine {
  raw: string;
  length: number;
  key: string;
  lineIndex: number;
}

export interface TitleParts {
  length: number;
  raw: string;
  key: string;
  lines: Array<{
    parts: Array<TitleLine>;
  }>;
}

export interface ThumbnailProps extends NativeDivProps {
  slug: string;
  src?: {
    desktop?: string;
    mobile?: string;
  };
  title: string;
  disableHover?: boolean;
  itemId?: string;
  responsiveWidth?: boolean;
}
