import { getToken } from '../utils/getToken'

import apiBase from './createApiBase'

const userApi = apiBase.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'User'],
    }),
    registration: build.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'User'],
    }),
    getUser: build.query({
      query: () => ({
        url: '/user',
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
    }),
    editUser: build.mutation({
      query: (body) => ({
        url: '/user',
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken()}` },
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
  }),
})

export default userApi
