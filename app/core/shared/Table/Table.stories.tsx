import { StoryFn as Story } from '@storybook/react';

import { Text } from '@/core/components/Typography/Text';
import { IconBitcoin } from '@/core/shared/Icons';

import { Table } from '.';

export const Default: Story = ({ ...args }) => (
  <Table {...args}>
    <tbody>
      {Array(5)
        .fill('')
        .map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            <td>
              <Text level="small">9:01 PM 2/26/2022</Text>
            </td>

            <td>
              <Text as="span" level="small" style={{ marginRight: '16px' }}>
                5.83650887
              </Text>
              <IconBitcoin />
            </td>

            <td>
              <Text level="small">Confirmed</Text>
            </td>

            <td>
              <Text level="small">059badba942e75d677bfa3a4edd9a</Text>
            </td>
          </tr>
        ))}
    </tbody>
  </Table>
);

export default {
  component: Table,
  title: 'Components / Table',
};
