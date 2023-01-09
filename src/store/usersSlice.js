import { createSlice } from '@reduxjs/toolkit'

import { getToken } from '../utils/getToken'

const initialState = {
  username: null,
  email: null,
  token: getToken() || null,
  image: null,
}

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
      state.icon = action.payload.image
    },
    logOut(state) {
      state.username = null
      state.email = null
      state.token = null
      state.image = null
    },
  },
})

export const { setUser, logOut } = usersSlice.actions
export default usersSlice.reducer
