import * as t from './types';
import { bffApiRequest } from '../api';

export interface GetArticleParams {
  lang: 'fr' | 'en';
}

export const getArticle = async (articleKey: string, params: GetArticleParams) => {
  // Use BFF endpoint for articles
  const searchParams = new URLSearchParams({
    locale: params.lang,
  });

  const { data } = await bffApiRequest.get(`/article?articleKey=${articleKey}&${searchParams.toString()}`);

  return data as t.GetArticleResponse;
};
