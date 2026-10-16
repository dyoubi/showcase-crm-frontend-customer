import Slider from 'react-slick';
import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

export const StyledSlider = styled(Slider)(({ theme }) => ({
  position: 'relative',
  marginTop: '150px',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    marginTop: '80px',
  },
  '.slick-slide': {
    position: 'relative', // Ensures the overlay positions relative to each slide
    transition: 'transform 0.3s ease', // Smooth scaling transition
    transform: 'scale(0.9)', // Scale down non-centered items
  },
  '.slick-center': {
    transform: 'scale(1)', // Full scale for centered item
    zIndex: 1, // Bring centered item to the front
  },
  '.slick-slide:not(.slick-center)::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black overlay
    zIndex: 1, // Make sure it’s above the image but below any centered styles
    borderRadius: '8px', // Optional: Match the border radius of the images if needed
    pointerEvents: 'none', // Ensure overlay doesn’t block interactions
  },
}));
