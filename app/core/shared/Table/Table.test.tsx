import React from 'react';

import { render } from '@/utils/testHelpers';

import { Table } from './Table';

describe('Table component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Table>
        <tbody>
          <tr>
            <td>Test</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('applies minWidth correctly', () => {
    const { container } = render(
      <Table minWidth={200} maxHeight="300px">
        <tbody>
          <tr>
            <td>Test</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(container.getElementsByTagName('table')[0]).toHaveStyle('min-width: 200px');
  });

  it('applies maxHeight correctly', () => {
    const { container } = render(
      <Table maxHeight="300px">
        <tbody>
          <tr>
            <td>Test</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(container.firstChild).toHaveStyle('max-height: 300px');
  });
});
