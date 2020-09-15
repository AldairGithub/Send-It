import api from './api-helper'


export const readAllUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, { user: userData })
  return response.data
}