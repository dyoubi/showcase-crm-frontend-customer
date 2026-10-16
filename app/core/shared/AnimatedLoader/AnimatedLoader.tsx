import { useIntl } from 'react-intl';

import { StyledLoader } from './AnimatedLoader.styles';

export const AnimatedLoader = () => {
  const { formatMessage } = useIntl();

  return (
    <StyledLoader>
      <video autoPlay loop muted playsInline controls={false} disablePictureInPicture style={{ pointerEvents: 'none' }}>
        <source src="/videos/bitplay_loader_3.mp4" type="video/mp4;codecs=hvc1" />
        <source src="/videos/bitplay_loader.webm" type="video/webm" />

        {formatMessage({ id: 'global.loading', defaultMessage: 'Loading' })}
      </video>
    </StyledLoader>
  );
};
