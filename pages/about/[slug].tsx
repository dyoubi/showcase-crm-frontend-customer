import axios, { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import { useIntl } from 'react-intl';

import { Policy } from '@/core/components/Policy/Policy';
import { Layout } from '@/core/components/Layout';
import { PoliciesArticlesSlugs } from '@/core/domains/article';
import { getPolicyDetails } from '@/core/constants/pageMenu';

import { wrapperServerSideProps } from '@/libs/next';

export const AboutPage = ({
  slug,
  pageTitle,
}: {
  slug: PoliciesArticlesSlugs;
  pageTitle: { id: string; defaultMessage: string };
}) => {
  const { formatMessage } = useIntl();

  return (
    <Layout
      title={formatMessage({
        id: pageTitle.id,
        defaultMessage: pageTitle.defaultMessage,
      })}
    >
      <Policy policyArticleSlug={slug} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ context }) => {
  const {
    query: { slug },
  } = context;

  if (!slug) {
    return {
      props: {
        statusCode: 404,
      },
    };
  }

  const pageData = getPolicyDetails(slug as PoliciesArticlesSlugs);

  if (!pageData) {
    return {
      props: {
        statusCode: 404,
      },
    };
  }

  return {
    props: {
      statusCode: 200,
      slug,
      pageTitle: pageData.pageTitle,
    },
  };
});

export default AboutPage;
