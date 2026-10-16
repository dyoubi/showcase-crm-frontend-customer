import { useAddIdArrayItems } from '@/core/hooks/useAddIdArrayItems';

import { BlockElement } from './BlockElement';
import * as t from './types';

export interface RichTextProps {
  data?: ReadonlyArray<t.BlockElement>;
}
export const RichText = ({ data }: RichTextProps) => {
  const memoizedArray = useAddIdArrayItems(data);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {memoizedArray?.map((blockElement) => (
        <BlockElement key={blockElement.id} data={blockElement} />
      ))}
    </>
  );
};
