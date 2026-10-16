import { useIntl } from 'react-intl';

import { Layout } from '@/core/components/Layout';

import { Error } from '@/features/Error';

type ErrorPageProps = {
  statusCode: number;
};

const ErrorPage = ({ statusCode }: ErrorPageProps) => {
  const { formatMessage } = useIntl();

  return (
    <Layout
      title={formatMessage({
        id: 'error.somethingWentWrong',
        defaultMessage: 'Something went wrong',
        description: 'main title for error page',
      })}
    >
      <Error code={statusCode} />
    </Layout>
  );
};

ErrorPage.getInitialProps = () => ({ statusCode: 404 });

export default ErrorPage;
