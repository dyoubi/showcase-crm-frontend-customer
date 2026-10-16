import { useMemo } from 'react';
import { produce } from 'immer';

import { genUID } from '@/utils/idgen';

export const useAddIdArrayItems = <C>(array?: ReadonlyArray<C>) =>
  useMemo(
    () =>
      produce(array || [], (draft) =>
        draft.map((item) => ({
          ...item,
          id: genUID(),
        })),
      ),
    [array],
  ) as ReadonlyArray<C & { id: string }>;
