import { configureStore } from '@reduxjs/toolkit'

import articleApi from '../service/articleApi'

import usersSlice from './usersSlice'

const store = configureStore({
  reducer: {
    user: usersSlice,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware),
})

export default store
