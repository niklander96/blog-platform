import { getToken } from '../utils/getToken'

import apiBase from './createApiBase'

const articleApi = apiBase.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query({
      query: ({ page, limit }) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        url: '/articles',
        params: { offset: (page - 1) * limit, limit },
      }),
      providesTags: (res) =>
        res?.articles
          ? [
              ...res.articles.map(({ slug }) => ({
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
      providesTags: ['ArticleDetails'],
    }),
    createArticle: build.mutation({
      query: (body) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        method: 'POST',
        url: '/articles',
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        method: 'DELETE',
        url: `/articles/${slug}`,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticleDetails'],
    }),
    editArticle: build.mutation({
      query: ({ body, slug }) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        method: 'PUT',
        url: `/articles/${slug}`,
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticleDetails'],
    }),
    likeArticle: build.mutation({
      query: (slug) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        method: 'post',
        url: `/articles/${slug}/favorite`,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticleDetails'],
    }),
    removeLikeFromArticle: build.mutation({
      query: (slug) => ({
        headers: { Authorization: `Bearer ${getToken()}` },
        method: 'delete',
        url: `/articles/${slug}/favorite`,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'ArticleDetails'],
    }),
  }),
})

export default articleApi
