import { FormattedMessage, useIntl } from 'react-intl';

import { RichText } from '@/core/components/RichText';
import { Box } from '@/core/shared/Box';
import { NestedLayout } from '@/core/components/Layout/NestedLayout';
import { policiesMenu } from '@/core/constants/pageMenu';
import { GetArticleSliceParams, PoliciesArticlesSlugs, useGetArticleQuery } from '@/core/domains/article';

type PolicyProps = {
  policyArticleSlug: PoliciesArticlesSlugs;
};

export const Policy = ({ policyArticleSlug }: PolicyProps) => {
  const { locale } = useIntl();
  const { data } = useGetArticleQuery({
    articleKey: policyArticleSlug.toString(),
    locale: locale as GetArticleSliceParams['locale'],
  });

  return (
    <NestedLayout
      title={<FormattedMessage id="page.policies" defaultMessage="Policies" />}
      menuItems={policiesMenu}
      hasDropdownMenu
    >
      <Box>
        <h1>{data?.title?.contentText}</h1>
        <RichText data={data?.body?.content} />
      </Box>
    </NestedLayout>
  );
};
