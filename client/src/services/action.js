import api from './api-helper'

export const postActionFromCurrentUser = async (entityId, userId, typeOfEntity, typeOfAction, contentFromUser) => {
  const response = await api.post('/actions', {
      entity_id: entityId,
      user_id: userId,
      type_of_entity: typeOfEntity,
      type_of_action: typeOfAction,
      content: contentFromUser
    })
  return response.data
}

export const deleteActionFromCurrentUser = async (actionId) => {
  const response = await api.delete(`/actions/${actionId}`)
  return response
}