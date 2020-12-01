import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

import './UserFollowList.css'

export default function UserFollowList(props) {
  const { show, hide, users, type, currentUser } = props

  const isUserFollowingCurrentUser = (user) => {
    if (user[0].id === currentUser.id || currentUser.id === undefined) {
      return null
    } else if (user[1].user_one_id === currentUser.id || user[1].user_two_id === currentUser.id) {
      if (user[1].status === 'Accepted') {
        return (
          <>
            <div className='ml-auto'>
               <Button variant='light'>Following</Button>
            </div>
          </>
        )
      } else if (user[1].status === 'Pending' && user[1].last_user_action_id === currentUser.id) {
        return (
          <>
            <div className='ml-auto'>
               <Button variant='light'>Following</Button>
            </div>
          </>
        )
      } else if (user[1].status === 'Pending' && user[1].last_user_action_id !== currentUser.id) {
        return (
          <>
            <div className='ml-auto'>
              <Button variant='info'>Follow</Button>
            </div>
          </>
        )
      }
    } else {
      return (
        <>
          <div className='ml-auto'>
            <Button variant='info'>Follow</Button>
          </div>
        </>
      )
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
            {users.map((user, index) => (
              <>
                <div className='userfollow-user-container d-flex flex-row flex-nowrap' key={index}>
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
                  {isUserFollowingCurrentUser(user)}
                </div>
              </>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}