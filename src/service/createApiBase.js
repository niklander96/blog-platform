import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiBase = createApi({
  reducerPath: 'api',
  tagTypes: ['Articles', 'User', 'ArticleShow'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  endpoints: () => ({}),
})

export default apiBase
