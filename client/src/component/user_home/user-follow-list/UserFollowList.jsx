import React from 'react'
import Modal from 'react-bootstrap/Modal'

import { Link } from 'react-router-dom'

import './UserFollowList.css'

export default function UserFollowList(props) {
  const { show, hide, users, type } = props

  return (
    <>
      <Modal show={show} onHide={hide} centered scrollable={true}>
        <Modal.Body>
          <div className='d-flex justify-content-center'>
            {type}
          </div>
          <div className='userfollow-users-container'>
            {users.map(user => (
              <>
                <div className='userfollow-user-container d-flex flex-row flex-nowrap'>
                  <div className='justify-content-start userfollow-userbio-container'>
                    <img className='userfollow-userbio-img' src={user[0].user_self_img === null ? 'https://i.imgur.com/FFn7QzH.jpg' : user[0].user_self_img}/>
                  </div>
                  <div className='d-flex flex-column'>
                    <div>
                      {/* when user clicks on link, modal is closed */}
                      <Link onClick={() => {hide()}} to={`/account/${user[0].username}`}><strong>{user[0].username}</strong></Link>
                    </div>
                    <div>
                      {user[0].name}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}