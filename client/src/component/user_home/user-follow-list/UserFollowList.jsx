import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './UserFollowList.css'

export default function UserFollowList(props) {
  const {
    show, hide,
    users,
    type,
    currentUser,
    handleFollow,
    isUserFollowingCurrentUser,
    getCurrentUserFriends
  } = props

  const responseToNoFollows = (typeOfList) => {
    if (typeOfList === 'Followers') {
      return (
        <p style={{color: 'gray', textAlign:'center'}}>This user does not have any followers right now</p>
      )
    } else {
      return (
        <p style={{color: 'gray', textAlign:'center'}}>This user is not following anyone right now</p>
      )
    }
  }

  useEffect(() => {
    const data = {
      users: users,
      type: type
    }
    getCurrentUserFriends(currentUser.id, data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const handleUsersCircle = (user) => {
    // 1. pass down user relationship along with user list to get the current user friends on user home
    const data = {
      type: type,
      user: user,
      users: users
    }
    if (user[0].id === currentUser.id) {
      return null
    } else if (user[1] === undefined) {
      // undefined means current user and user dont have a relationship yet
      return (
        <>
          <div className='ml-auto'>
            <Button onClick={() => { handleFollow(false, currentUser.id, user[0].id, 'Pending', currentUser.id, data) }} variant='info'>Follow</Button>
          </div>
        </>
      )
    } else {
      return isUserFollowingCurrentUser(user, data)
    }
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
                    {user[0].user_self_img === null ?
                      <>
                        <FontAwesomeIcon
                          icon={faUser}
                          size='2x'
                        />
                      </>
                      :
                      <>
                        <img
                          alt={`user avatar by ${user[0].username}`}
                          className='userfollow-userbio-img'
                          src={user[0].user_self_img}
                        />
                      </>
                    }
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