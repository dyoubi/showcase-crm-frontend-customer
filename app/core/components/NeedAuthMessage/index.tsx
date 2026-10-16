import { useIntl } from 'react-intl';

import { Flex } from '@/core/shared/Flex';

export const NeedAuthMessage = () => {
  const { formatMessage } = useIntl();

  return (
    <Flex alignItems="center" justifyContent="center" style={{ height: 550, padding: 50 }}>
      <span>
        {formatMessage({
          id: 'youNeedToBeAuthenticated',
          defaultMessage: 'You need to be authenticated for have access to this page.',
        })}
      </span>
    </Flex>
  );
};
