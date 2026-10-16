import { useMediaContext } from './useMediaContext';

export const useBreakpoints = () => {
  const { device, isDesktop, isMobile, isMobilePlus, isTablet, isTabletPlus, isWidescreen } = useMediaContext();

  return {
    device,
    isDesktop,
    isPhone: isMobile || isMobilePlus,
    isTablet: isTablet || isTabletPlus,
    isTabletOrPhone: isMobile || isMobilePlus || isTablet || isTabletPlus,
    isWidescreen,
  };
};
