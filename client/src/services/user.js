import api from './api-helper'

export const readAllUsers = async () => {
  const response = await api.get('/users')
  return response.data
}
// PUT creates credential on user data changes (user needs to add a correct password for the changes to work)
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, { user: userData })
  return response.data
}

export const allUserPhotos = async (id) => {
  const response = await api.get(`/entities/user/${id}`)
  return response.data
}

export const allUserRelationships = async (id) => {
  const response = await api.get(`/users/${id}/user_list`)
  return response.data
}

export const deleteAvatarFromCloud = async (id, userData) => {
  const response = await api.post(`/users/${id}/delete_avatar_from_cloud`, userData)
  return response.data
}
// PATCH would let the user change their password, but we want to add credentials for user security
// export const updatePassword = async (id, newPassword) => {
//   const response = await api.patch(`/users/${id}/update_password`, { user: newPassword })
//   return response.data
// }