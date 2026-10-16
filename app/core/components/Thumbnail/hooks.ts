import { TitleParts } from './types';

export const useTitleParts = () => {
  const getTitleParts = (title: string) => {
    const words = title ? title.split(' ') : [];
    const lines: Array<{ text: string; parts: Array<{ text: string; length: number }> }> = [];
    let currentLine: any = { text: '', parts: [] };

    words.forEach((word) => {
      if (currentLine.text.length + word.length + 1 < 9 || currentLine.text.length === 0) {
        currentLine.text += (currentLine.text.length > 0 ? ' ' : '') + word;
        currentLine.parts.push({ text: word, length: word.length });
      } else {
        lines.push(currentLine);
        currentLine = { text: word, parts: [{ text: word, length: word.length }] };
      }
    });

    if (currentLine.text.length > 0) {
      lines.push(currentLine);
    }

    const titleParts: TitleParts = {
      length: lines.length,
      raw: title,
      key: title,
      lines: lines.map((line, lineIndex) => ({
        parts: line.parts.map((part, partIndex) => ({
          raw: part.text,
          length: Math.max(...line.parts.map((p) => p.length)), // Use max length in line
          key: `${title}-${lineIndex}-${partIndex}`,
          lineIndex,
        })),
      })),
    };

    return titleParts;
  };

  return {
    getTitleParts,
  };
};
