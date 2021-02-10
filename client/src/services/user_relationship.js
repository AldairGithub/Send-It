import api from './api-helper'

export const postNewUserRelationship = async (userOneId, userTwoId, newStatus, lastUserActionId) => {
  const response = await api.post('/user_relationships', {
    user_one_id: userOneId,
    user_two_id: userTwoId,
    status: newStatus,
    last_user_action_id: lastUserActionId
  })
  return response.data
}

export const updateUserRelationship = async (id, relationshipData) => {
  const response = await api.put(`/user_relationships/${id}`, { user_relationship: relationshipData })
  return response.data
}

export const deleteUserRelationship = async (id) => {
  const response = await api.delete(`/user_relationships/${id}`)
  return response
}