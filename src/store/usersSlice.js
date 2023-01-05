import { createSlice } from '@reduxjs/toolkit'

import { getToken } from '../utils/getToken'

const initialState = {
  login: null,
  email: null,
  token: getToken() || null,
  icon: null,
}

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login
      state.email = action.payload.email
      state.token = action.payload.token
      state.icon = action.payload.icon
    },
    logOut(state) {
      state.login = null
      state.email = null
      state.token = null
      state.icon = null
    },
  },
})

export const { setUser, logOut } = usersSlice.actions
export default usersSlice.reducer
