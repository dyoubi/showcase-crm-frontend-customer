import { Filler, StyledBar } from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = ({ progress, customColor }: ProgressBarProps) => (
  <StyledBar data-testid="progress-bar">
    <Filler progress={progress} customColor={customColor} />
  </StyledBar>
);
