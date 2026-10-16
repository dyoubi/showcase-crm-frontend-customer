import { FormattedMessage } from 'react-intl';

import { BlockedPageContainer, BottomText, LogoContainer, SorryImg, Subtitle, Title } from './BlockedPage.styles';

export const BlockedPage = () => {
  return (
    <BlockedPageContainer>
      <LogoContainer>
        <img alt="Logo" src="/Bitplay-logo.png" />
      </LogoContainer>
      <div>
        <Title>
          <FormattedMessage id="blocked.sorry" defaultMessage="Sorry, Bitplay.com is not available in your region." />
        </Title>
        <Subtitle>
          <FormattedMessage
            id="blocked.vpn"
            defaultMessage="If you are using a VPN you may need to disable it and try again."
          />
        </Subtitle>
        <SorryImg src="/images/blocked-sorry.png" alt="Sorry" />
      </div>
      <BottomText>
        <FormattedMessage
          id="blocked.contact"
          defaultMessage="Please contact support [at] bitplay.com if you require further assistance"
        />
      </BottomText>
    </BlockedPageContainer>
  );
};
