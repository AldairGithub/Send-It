import React from 'react'
import Button from 'react-bootstrap/Button'

export default function UserFollowButton(props) {
  const { relationship, currentUser, handleFollow } = props


  const handleButton = () => {
    if (relationship === null) {
      return
    } else if (relationship[1] === undefined) {
      return (
        <>
          <div className='p-2'>
            <Button onClick={() => { handleFollow(false, currentUser.id, relationship[0].id, 'Pending', currentUser.id) }} variant='info'>Follow</Button>
          </div>
        </>
      )
    } else {
      if (relationship[1].user_one_id === currentUser.id) {
        if (relationship[1].status === 'Pending') {
          return (
            <>
              <div className='p-2'>
                <Button onClick={() => { handleFollow(relationship[1].id, null, null, false, null) }} variant='light'>Following</Button>
              </div>
            </>
          )
        } else if (relationship[1].status === 'Denied') {
          if (relationship[1].last_user_action_id === currentUser.id) {
            return (
              <>
                <div className='p-2'>
                  <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Accepted', currentUser.id) }} variant='info'>Follow</Button>
                </div>
              </>
            )
          } else {
            return (
              <>
                <div className='p-2'>
                  <Button onClick={() => { handleFollow(relationship[1].id, null, null, false, null) }} variant='danger'>Delete</Button>
                </div>
              </>
            )
          }
        } else if (relationship[1].status === 'Accepted') {
          return (
            <>
              <div className='p-2'>
                <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Denied', currentUser.id) }} variant='light'>Following</Button>
              </div>
            </>
          )
        }
      } else if (relationship[1].user_two_id === currentUser.id) {
        if (relationship[1].status === 'Pending') {
          return (
            <>
              <div className='p-2'>
                <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Accepted', currentUser.id) }} variant='info'>Follow</Button>
              </div>
            </>
          )
        } else if (relationship[1].status === 'Denied') {
          if (relationship[1].last_user_action_id === currentUser.id) {
            return (
              <>
                <div className='p-2'>
                  <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Accepted', currentUser.id) }} variant='info'>Follow</Button>
                </div>
              </>
            )
          } else {
            return (
              <>
                <div className='p-2'>
                  <Button onClick={() => { handleFollow(relationship[1].id, null, null, false, null) }} variant='danger'>Delete</Button>
                </div>
              </>
            )
          }
        } else if (relationship[1].status === 'Accepted') { 
          return (
            <>
              <div className='p-2'>
                <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Denied', currentUser.id) }} variant='light'>Following</Button>
              </div>
            </>
          )
        }
      }
    }

  }

  return (
    <>
      {handleButton()}
    </>
  )

}
