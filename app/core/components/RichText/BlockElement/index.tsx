import { Button } from '@/core/shared/Button';
import { Align } from '@/core/components/RichText/Align';
import { useAddIdArrayItems } from '@/core/hooks/useAddIdArrayItems';

import { TextElement } from '../TextElement';
import { Image } from './Image';
import { isBlockElement } from '../logic.helper';
import * as t from '../types';
import * as S from './styles';

interface BlockElementProps {
  data?: t.BlockElement;
}

export const BlockElement = ({ data }: BlockElementProps) => {
  const style = { textAlign: data?.align };
  const memoizedChildren = useAddIdArrayItems(data?.children);

  const children = memoizedChildren.map((textChildren) =>
    // when there is list (bullet or numbered) in our RichText,
    // there is a Block that containing another Block
    isBlockElement(textChildren) ? (
      <BlockElement key={textChildren.id} data={textChildren} />
    ) : (
      <TextElement key={textChildren.id} data={textChildren} />
    ),
  );

  switch (data?.type) {
    case 'block-quote':
      return <S.Blockquote style={style}>{children}</S.Blockquote>;
    case 'bulleted-list':
      return <ul style={style}>{children}</ul>;
    case 'heading-one':
      return <h1 style={style}>{children}</h1>;
    case 'heading-two':
      return <h2 style={style}>{children}</h2>;
    case 'heading-three':
      return <h3 style={style}>{children}</h3>;
    case 'heading-four':
      return <h4 style={style}>{children}</h4>;
    case 'heading-five':
      return <h5 style={style}>{children}</h5>;
    case 'heading-six':
      return <h6 style={style}>{children}</h6>;
    case 'list-item':
      return <li style={style}>{children}</li>;
    case 'numbered-list':
      return <ol style={style}>{children}</ol>;
    case 'image':
      return (
        <Align align={data?.align}>
          <Image data={data} />
        </Align>
      );
    case 'button':
      return (
        <Align align={data?.align}>
          <a href={data?.link || ''} target="_blank" rel="noreferrer">
            <Button>{children}</Button>
          </a>
        </Align>
      );
    case 'custom':
      return <Align align={data?.align}>{data.custom}</Align>;
    default:
      return <p style={style}>{children}</p>;
  }
};
