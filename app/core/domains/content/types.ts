import { ReactNode } from 'react';

export type BlockType =
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'heading-four'
  | 'heading-five'
  | 'heading-six'
  | 'block-quote'
  | 'numbered-list'
  | 'bulleted-list'
  | 'list-item'
  | 'paragraph'
  | 'image'
  | 'button'
  | 'custom';

export type Align = 'left' | 'center' | 'right' | 'justify';

export interface BlockElement {
  type: BlockType;
  url?: string;
  link?: string;
  align?: Align;
  children: ReadonlyArray<TextElement | BlockElement>;
  custom?: ReactNode;
}

export interface TextElement {
  text: string;
  bold?: true;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  tooltip?: string;
  link?: string;
  color?: string;
}

export interface ContentImage {
  contentURL?: string;
  size?: number;
  mimetype?: string;
}

export interface ContentText {
  contentText?: string;
}

export interface ContentRichText {
  content?: ReadonlyArray<BlockElement>;
}
