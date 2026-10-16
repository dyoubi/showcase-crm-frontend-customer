import { GetServerSideProps } from 'next';

import { Layout } from '@/core/components/Layout';

import { wrapperServerSideProps } from '@/libs/next';

const MyExamplePage = () => <Layout title="My example page title ">My example Page</Layout>;

/**
 * very important to use the wrapperServerSideProps helper, because the purpose
 * of this helper is to inject to all pages some common props like session for example
 * */
export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(() => ({ props: {} }));

export default MyExamplePage;
