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
  }),
})

export default articleService
