import { isApiError } from '@/core/domains/api';

import { useNotification } from '@/utils/notifications/notification-context';

import * as t from './types';

import { usePostCategory } from '@/standards/domains/category';

interface UseOnFormSubmitParams {
  onFormSubmitted?: () => void;
}

export const useOnFormSubmit = ({ onFormSubmitted }: UseOnFormSubmitParams) => {
  // hooks
  const { addNotification } = useNotification();
  const [postCategory] = usePostCategory();

  // constants
  const onSubmit = async (values: t.CategoryForm) => {
    if (!values?.name || !values?.slug) {
      return;
    }

    try {
      // API CALL / logic checker etc
      await postCategory({
        name: values.name,
        slug: values.slug,
      }).unwrap();

      addNotification({
        type: 'success',
        title: 'Category created',
        text: 'Category was created successfully',
      });

      onFormSubmitted?.();
    } catch (e) {
      if (!isApiError(e)) {
        addNotification({
          type: 'error',
          title: 'Error',
          text: 'Unknown error',
        });

        return;
      }

      addNotification({
        type: 'error',
        title: 'Error',
        text: 'Api error message',
      });
    }
  };

  return { onSubmit };
};
