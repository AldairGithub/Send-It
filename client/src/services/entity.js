import api from './api-helper'

export const postEntity = async (contentText, imgUrl, userId) => {
  const response = await api.post('/entities', {
    name: 'Photo',
    content: contentText,
    url: imgUrl,
    user_id: userId
  })
  return response.data
}
export const deleteEntity = async (entityId) => {
  const response = await api.delete(`/entities/${entityId}`)
  return response
}