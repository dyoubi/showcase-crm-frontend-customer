import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { ContentContainer } from '@/core/components/Layout';
import { Heading } from '@/core/components/Typography';

import { ErrorProps } from './Error.types';
import { ErrorContainer } from './Error.styles';

export const Error: FC<ErrorProps> = () => (
  <ContentContainer>
    <ErrorContainer>
      <Heading align="center" element="h1" size="h1">
        <FormattedMessage
          id="error.somethingWentWrong"
          defaultMessage="Something went wrong"
          description="main title for error page"
        />
      </Heading>
      <p>
        <FormattedMessage
          id="error.somethingWentWrongCopy"
          defaultMessage="We are sorry, but the page you're looking for doesn't exist or another error occurred."
          description="main descritpion for general error"
        />
      </p>
    </ErrorContainer>
  </ContentContainer>
);
