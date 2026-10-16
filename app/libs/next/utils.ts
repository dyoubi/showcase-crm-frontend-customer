import { GetServerSideProps, GetServerSidePropsContext, Redirect } from 'next';
import { getServerSession, Session } from 'next-auth';
import merge from 'lodash/merge';

import { StoreType, wrapper } from '@/core/store/store';

import { AnySerializableObject } from '@/utils/typescript';

import { authOptions } from '../../../pages/api/auth/[...nextauth]';

type CbReturnType = { props: AnySerializableObject } | { redirect: Redirect } | { notFound: true };

type Cb = (params: { context: GetServerSidePropsContext; store: StoreType }) => Promise<CbReturnType> | CbReturnType;

/**
 * This wrapper will automatically feed auth session to all pages
 * Please use this for generate your serverside props
 */
export const wrapperServerSideProps = (cb: Cb) => {
  const re: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const clientSession = await getServerSession(context.req, context.res, authOptions);

    const session: Session = {
      player: clientSession?.player || null,
      accessToken: clientSession?.accessToken || null,
      expires: clientSession?.expires || null,
    };

    // here we inject into our callbacks the context & store
    const cbReturnValue = cb({ context, store });

    const value = cbReturnValue instanceof Promise ? await cbReturnValue : cbReturnValue;

    return merge({}, value, {
      props: {
        session: clientSession ? session : null,
      },
    });
  });

  return re;
};
