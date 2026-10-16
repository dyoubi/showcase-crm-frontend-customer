import { NextApiRequest, NextApiResponse } from 'next';

import countries from './countries.json';
import { GetCountriesResponse } from './types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method?.toLowerCase() !== 'get') {
    res.status(404).json({ code: 'NOT_FOUND' });

    return;
  }

  const response: GetCountriesResponse = [...countries]
    .map((country) => ({
      label: country.EN,
      value: country.code,
    }))
    .sort((a, b) => (a.label < b.label ? -1 : 1));

  res.json(response);
};
