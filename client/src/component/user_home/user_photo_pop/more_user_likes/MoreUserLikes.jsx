import React from 'react'
import Modal from 'react-bootstrap/Modal'

import { Link } from 'react-router-dom'
import UserFollowButton from '../../user_follow_button/UserFollowButton'

import './MoreUserLikes.css'

export default function MoreUserLikes(props) {
  const { show, hide, list, hideModal, currentUser, handleFollow } = props
  
  // closes both modals at the same time, preventing error on users that do not have photos in the account
  const handleCloseModal = (e) => {
    hide()
    hideModal()
  }

  return (
    <>
      <Modal show={show} onHide={hide} centered>
        <Modal.Body>
          <div className='userlikes-title d-flex flex-column align-items-center justify-content-center'>
            Likes
          </div>
          <hr />
            <div className='d-flex flex-column justify-content-start'>
              {list.map((user, index) => (
                  <>
                    <div key={index} className='d-flex flex-row userlikes-container'>
                      <div className='userlikes-user-img-container'>
                        <img className='userlikes-user-img' src={user[1].user_self_img === null ? 'https://i.imgur.com/FFn7QzH.jpg' : user[1].user_self_img} />
                      </div>
                      <div className='d-flex flex-column'>
                        <div>
                          <Link onClick={(e) => handleCloseModal(e)} className='userlikes-link-text' to={`/account/${user[1].username}`}>{user[1].username}</Link>
                        </div>
                        <div>
                          {user[1].name}
                        </div>
                    </div>
                      {user[1].id === currentUser.id ? null : <UserFollowButton relationship={[user[1], user[2]]} currentUser={currentUser} handleFollow={handleFollow}/>}
                    </div>
                  </>
                ))}
             </div>
        </Modal.Body>
      </Modal>
    </>
  )
}