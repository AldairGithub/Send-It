import React from 'react'
import Modal from 'react-bootstrap/Modal'

import { Link } from 'react-router-dom'

import './MoreUserLikes.css'

export default function MoreUserLikes(props) {
  const { show, hide, list, hideModal } = props
  
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
                  <div  key={index} className='d-flex flex-row userlikes-container'>
                    <div className='userlikes-user-img-container'>
                      <img className='userlikes-user-img' src={user[1][0].user_self_img}/>
                    </div>
                    <div className='d-flex flex-column'>
                      <div>
                        <Link onClick={(e) => handleCloseModal(e)} className='userlikes-link-text' to={`/account/${user[1][0].username}`}>{user[1][0].username}</Link>
                      </div>
                      <div>
                        {user[1][0].name}
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