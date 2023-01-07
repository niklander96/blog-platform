import { getToken } from '../utils/getToken'

import apiBase from './createApiBase'

const articleService = apiBase.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query({
      query: ({ page, limit }) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        url: '/articles',
        params: { offset: (page - 1) * limit, limit },
      }),
      providesTags: (result) =>
        result?.articles
          ? [
              ...result.articles.map(({ slug }) => ({
                type: 'Articles',
                id: slug,
              })),
              { type: 'Articles', id: 'LIST' },
            ]
          : [{ type: 'Articles', id: 'LIST' }],
    }),
    getArticle: build.query({
      query: ({ slug }) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        url: `articles/${slug}`,
      }),
      providesTags: ['ArticleInfo'],
    }),
    createArticle: build.mutation({
      query: (body) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        method: 'post',
        url: '/articles',
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticlesInfo'],
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        method: 'delete',
        url: `/articles/${slug}`,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticlesInfo'],
    }),
    editArticle: build.mutation({
      query: ({ body, slug }) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        method: 'put',
        url: `/articles/${slug}`,
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticlesInfo'],
    }),
  }),
})

export default articleService
