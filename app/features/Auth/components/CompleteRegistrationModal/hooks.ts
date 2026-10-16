import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetCountriesResponse } from 'pages/api/countries/types';
import { useIntl } from 'react-intl';

import { useNotification } from '@/utils/notifications/notification-context';

// no need to put this request in domain directory & use rtk query
export const useGetCountriesList = () => {
  const [countries, setCountries] = useState<GetCountriesResponse>([]);
  const { addNotification } = useNotification();
  const { formatMessage } = useIntl();

  useEffect(() => {
    axios
      .get<GetCountriesResponse>('/api/countries')
      .then((response) => setCountries(response.data))
      .catch(() =>
        addNotification({
          type: 'error',
          title: formatMessage({
            id: 'notification.errorTitle',
            defaultMessage: 'Error',
          }),
          text: 'Cannot fetch countries',
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return countries;
};
