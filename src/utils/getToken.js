export const setToken = (token) => {
  localStorage.setItem('token', token)
}

const isTokenGone = (token) => {
  const tokens = atob(token.split('.')[1])
  const goneTime = JSON.parse(tokens).exp
  return Date.now() > goneTime * 1000
}

export const isTokenValid = () => {
  const token = localStorage.getItem('token')

  return token ? !isTokenGone(token) : false
}

export const getToken = () => localStorage.getItem('token')

export const removeToken = () => localStorage.removeItem('token')
