import { Sizing } from 'styled-components';

import { ButtonSize } from './Button.types';

export const ICON_SIZE_BY_BUTTON_SIZE = {
  [ButtonSize.Big]: 'xl' as Sizing,
  [ButtonSize.Block]: 'l' as Sizing,
  [ButtonSize.Medium]: 'm' as Sizing,
  [ButtonSize.Small]: 's' as Sizing,
};
