export type ToggleProps = {
  labels: Array<string>;
  onSelect: (selectedIndex: number) => void;
  activeIndex?: number;
};
