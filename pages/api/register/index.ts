import { isAxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { createServerSideRequestHeaders, registerUserAuthApi } from '../auth/helper';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method?.toLowerCase() !== 'post') {
    return res.status(404).json({ code: 'NOT_FOUND' });
  }
  const { birth, email, locale, marketingAcceptation, metadata, password, username } = req.body;

  const headers = createServerSideRequestHeaders(req);

  const payload = {
    birth,
    email,
    locale,
    marketingAcceptation,
    metadata,
    password,
    username,
  };

  return registerUserAuthApi(payload, { headers })
    .then((response) => res.status(200).json({ ...response, registrationStatus: 'PENDING' }))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);

      if (!isAxiosError(e)) {
        res.status(400).json({ code: 'UNKNOW_REGISTRATION_ERROR' });

        return;
      }

      res.status(400).json({ code: 'REGISTRATION_FAILED' });
    });
};
