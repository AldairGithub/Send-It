import api from './api-helper'

export const forgotPassword = async (userEmail) => {
  const response = await api.post('password/forgot', {email: userEmail})
  return response.data
}

export const resetPassword = async (userId, userToken, userPassword) => {
  const response = await api.post('/password/reset', {
    id: userId,
    token: userToken,
    password: userPassword
  })
  return response.data
}