
// get array of user relationships and sort them based on following status
export const followingList = (relationship, id) => {

  const following = []

  relationship.forEach(arr => {
    if (arr.user_one_id === id) {
      if (arr.status === 'Pending' && arr.last_user_action_id === id) {
        following.push(arr)
      } else if (arr.status === 'Denied' && arr.last_user_action_id !== id) {
        following.push(arr)
      } else if (arr.status === 'Accepted') {
        following.push(arr)
      }
    } else if (arr.user_two_id === id) {
      if (arr.status === 'Accepted') {
        following.push(arr)
      } else if (arr.status === 'Denied' && arr.last_user_action_id !== id) {
        following.push(arr)
      }
    }
  })
  return following
}

export const combineRelationshipToUserData = (relationships, id, allUsers) => {
  return relationships.map(relationship => [
    relationship,
    allUsers.filter(user => user.id === relationship.user_one_id && user.id !== id || user.id === relationship.user_two_id && user.id !== id)[0]
  ])
}