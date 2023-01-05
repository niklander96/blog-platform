import { configureStore } from '@reduxjs/toolkit'

import articleService from '../service/articleService'

import usersSlice from './usersSlice'

const store = configureStore({
  reducer: {
    user: usersSlice,
    [articleService.reducerPath]: articleService.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleService.middleware),
})

export default store
