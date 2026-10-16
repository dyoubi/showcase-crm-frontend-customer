import { IconAddPlus, IconBag, IconWallet } from '@/core/shared/Icons';

import { render, screen, userEvent } from '@/utils/testHelpers';

import { theme } from '@/themes/main';

import { Dropdown, DropdownItem, DropdownMenu } from '.';

const dropdownContent = (
  <DropdownMenu>
    <DropdownItem>
      <IconWallet />
      Menu 1
    </DropdownItem>
    <DropdownItem>
      <a href="/">
        <IconBag />
        Menu 2
      </a>
    </DropdownItem>
    <DropdownItem>
      <IconAddPlus />
      Menu 3 active
    </DropdownItem>
    <DropdownItem>Menu 4</DropdownItem>
  </DropdownMenu>
);

describe('<Dropdown />', () => {
  it('renders correctly', () => {
    render(<Dropdown content={dropdownContent}>dropdown label</Dropdown>);

    expect(screen.getByText('dropdown label')).toBeInTheDocument();
  });

  it('shows dropdown items when clicked', () => {
    render(<Dropdown content={dropdownContent}>dropdown label</Dropdown>);

    const dropdownLabel = screen.getByText('dropdown label');

    userEvent.click(dropdownLabel).then(() => {
      expect(screen.getByText('Menu 1')).toBeInTheDocument();
      expect(screen.getByText('Menu 2')).toBeInTheDocument();
    });
  });

  it('has correct styling as plain', () => {
    render(<Dropdown content={dropdownContent}>dropdown label</Dropdown>);

    expect(screen.getByText('dropdown label')).not.toHaveStyleRule(
      'border',
      `1px solid ${theme.rebrandingColors.colorsToBeDeprecated.dark[40]}`,
    );
  });
});
