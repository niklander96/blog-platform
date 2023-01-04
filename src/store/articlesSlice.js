import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articlesArray: [],
  articlesNumber: 0,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles(state, action) {
      state.articlesArray.push(...action.payload)
    },
  },
})

export const { setArticles } = articlesSlice.actions

export default articlesSlice.reducer
