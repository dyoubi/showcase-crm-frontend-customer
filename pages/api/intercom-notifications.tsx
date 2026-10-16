import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const getSubs = async () => {
  const response = await axios.get(`https://api.intercom.io/subscription_types`, {
    headers: {
      'Intercom-Version': '2.13',
      Authorization: `Bearer ${process.env.INTERCOM_ATOKEN}`,
    },
  });

  const { data } = response;

  return data;
};

const intercomWHRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Verify the Intercom webhook signature
    const signature = req.headers['x-hub-signature'];
    const whsubId = req.headers['intercom-webhook-subscription-id'];

    if (!signature || !whsubId) {
      return res.status(401).json({ error: 'Missing signature or subscription ID' });
    }

    const { body } = req;

    if (body.topic === 'contact.user.created') {
      const contactId = body.data?.item?.id;
      const markAcc = body.data?.item?.custom_attributes?.marketing_acceptance;

      // Use the Intercom API to update the contact
      try {
        if (markAcc) {
          const { data } = await getSubs();

          const liveSubs = data.filter((sub: any) => {
            return sub.state === 'live' && sub.consent_type === 'opt_in';
          });

          if (liveSubs.length > 0) {
            const promises = liveSubs.map((sub: any) => {
              return axios.post(
                `https://api.intercom.io/contacts/${contactId}/subscriptions`,
                {
                  id: sub.id,
                  consent_type: sub.consent_type,
                },
                {
                  headers: {
                    'Intercom-Version': '2.13',
                    Authorization: `Bearer ${process.env.INTERCOM_ATOKEN}`,
                  },
                },
              );
            });

            await Promise.all(promises);
          }
        }

        return res.status(200).json({ message: 'Contact updated successfully' });
      } catch (error) {
        console.error('Error updating contact:', error);

        return res.status(500).json({ error: 'Failed to update contact' });
      }
    } else {
      return res.status(200).json({ message: 'Ignoring other events' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default intercomWHRoute;
