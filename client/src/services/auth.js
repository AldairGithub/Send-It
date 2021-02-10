import api from './api-helper'

export const loginUser = async (loginData) => {
  const response = await api.post('/auth/login', { authentication: loginData })
  localStorage.setItem('authToken', response.data.token)
  api.defaults.headers.common.authorization = `Bearer ${response.data.token}`
  return response.data.user
}

export const registerUser = async (registerData) => {
  const response = await api.post('/users', { user: registerData })
  localStorage.setItem('authToken', response.data.token)
  api.defaults.headers.common.authorization = `Bearer ${response.data.token}`
  return response.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken')
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const response = await api.get('/auth/verify')
    return response.data
  }
  return null
}

export const removeToken = () => {
  api.defaults.headers.common.authorization = null
}