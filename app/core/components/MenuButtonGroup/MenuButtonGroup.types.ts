export interface ButtonInfo {
  title: string | JSX.Element;
  path: string;
  id?: string;
}

export interface SelectInfo {
  value: string;
  label: string;
}

export interface MenuButtonGroupProps {
  currentPath?: string;
  menuList?: Array<ButtonInfo>;
  selectList?: Array<SelectInfo>;
  hideMobile?: boolean;
  isLink?: boolean;
  onSelect?: (selectedItem: string) => void;
  selected?: string;
}
