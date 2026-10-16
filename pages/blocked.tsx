import { GetServerSideProps } from 'next';

import { BlockedPage } from '@/features/blockedPage';

import { wrapperServerSideProps } from '@/libs/next';

export const Blocked = () => {
  return <BlockedPage />;
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(() => ({ props: {} }));

export default Blocked;
