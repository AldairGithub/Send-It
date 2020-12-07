import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { Link, useRouteMatch } from 'react-router-dom'

import './UserFollowList.css'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

export default function UserFollowList(props) {
  const {
    show, hide,
    users,
    type,
    currentUser,
    handleFollow,
    allUserRelationships,
    followModal,
    setFollowModal
  } = props

  const responseToNoFollows = (typeOfList) => {
    if (typeOfList === 'Followers') {
      return (
        <p>This user does not have any followers right now</p>
      )
    } else {
      return (
        <p>This user is not following anyone right now</p>
      )
    }
  }

  useEffect(() => {
    getCurrentUserFriends(currentUser.id)
  }, [currentUser])

  const getCurrentUserFriends = async (id) => {
    const friends = await allUserRelationships(id)

    const filterFriends = users.map(user => {
      if (user[1].user_one_id !== currentUser.id && user[1].user_two_id !== currentUser.id) {
        let newFilter = friends.filter(friend => friend.user_one_id === user[0].id || friend.user_two_id === user[0].id)
        return [user[0], newFilter[0]]
      } else {
        return user
      }
    })
    setFollowModal({
      ...followModal,
      list: filterFriends
    })
  }

  const handleUsersCircle = (user) => {
    if (user[0].id === currentUser.id) {
      return null
    } else if (user[1] === undefined) {
      // undefined means current user and user dont have a relationship yet
      return (
        <>
          <div className='ml-auto'>
            <Button onClick={() => { handleFollow(false, currentUser.id, user[0].id, 'Pending', currentUser.id) }} variant='info'>Follow</Button>
          </div>
        </>
      )
    } else {
      return isUserFollowingCurrentUser(user)
    }
  }

  const isUserFollowingCurrentUser = (user) => {
    if (user[1].user_one_id === currentUser.id) {
      if (user[1].status === 'Pending') {
        // current user followed user, but user hasnt followed back
        return (
          <>
            <div className='ml-auto'>
              <Button onClick={() => { handleFollow(user[1].id, null, null, false, null) }} variant='light'>Following</Button>
            </div>
          </>
        )
      } else if (user[1].status === 'Denied') {
        if (user[1].last_user_action_id === currentUser.id) {
          // cu followed user, user followed back, cu unfollowed user, user still follows cu
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Accepted', currentUser.id) }} variant='info'>Follow</Button>
              </div>
            </>
          )
        } else {
          // cu followed user, user followed back, user unfollowed cu, cu still follows user
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(user[1].id, null, null, false, null) }} variant='light'>Following</Button>
              </div>
            </>
          )
        }
      } else if (user[1].status === 'Accepted') {
        return (
          <>
            <div className='ml-auto'>
              <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Denied', currentUser.id) }} variant='light'>Following</Button>
            </div>
          </>
        )
      }

    } else if (user[1].user_two_id === currentUser.id) {
      if (user[1].status === 'Pending') {
        return (
          <>
            <div className='ml-auto'>
              <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Accepted', currentUser.id) }} variant='info'>Follow</Button>
            </div>
          </>
        )
      } else if (user[1].status === 'Denied') {
        if (user[1].last_user_action_id === currentUser.id) {
          // user followed cu, cu followed back, cu unfollowed user, user still follows cu
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Accepted', currentUser.id) }} variant='info'>Follow</Button>
              </div>
            </>
          )
        } else {
          // user followed cu, cu followed back, user unfollowed cu, cu still follows user
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(user[1].id, null, null, false, null) }} variant='light'>Following</Button>
              </div>
            </>
          )
        }
      } else if (user[1].status === 'Accepted') {
        return (
          <>
            <div className='ml-auto'>
              <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Denied', currentUser.id) }} variant='light'>Following</Button>
            </div>
          </>
        )
      }
    } else {
      return (
        <>
          <div className='ml-auto'>
            <Button onClick={() => { handleFollow(false, currentUser.id, user[0].id, 'Pending', currentUser.id) }} variant='info'>Follow</Button>
          </div>
        </>
      )
    }
    handleUsersCircle(user)
  }

  return (
    <>
      <Modal show={show} onHide={hide} centered scrollable={true}>
        <Modal.Body>
          <div className='d-flex justify-content-center'>
            <strong style={{fontSize: "25px"}}>{type}</strong>
          </div>
          <hr />
          <div className='userfollow-users-container d-flex flex-column'>
            {users.length === 0 ? responseToNoFollows(type) : users.map((user, index) => (
              <div key={index}>
                <div className='userfollow-user-container d-flex flex-row flex-nowrap'>
                  <div className='userfollow-userbio-container'>
                    <img className='userfollow-userbio-img' src={user[0].user_self_img === null ? 'https://i.imgur.com/FFn7QzH.jpg' : user[0].user_self_img}/>
                  </div>
                  <div className='d-flex flex-column'>
                    <div>
                      {/* when user clicks on link, modal is closed */}
                      <Link  onClick={() => {hide()}} className='userfollow-link-text' to={`/account/${user[0].username}`}>{user[0].username}</Link>
                    </div>
                    <div>
                      {user[0].name}
                    </div>
                  </div>
                  {/* cant use TERNARY OPERATOR ' ? : ' */}
                  {handleUsersCircle(user)}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}