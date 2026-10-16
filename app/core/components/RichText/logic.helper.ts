import * as t from './types';

export const isBlockElement = (data: unknown): data is t.BlockElement => !!(data as t.BlockElement)?.type;
