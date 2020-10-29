import React from 'react'
import Modal from 'react-bootstrap/Modal'

import './UserPhotoPop.css'

export default function UserPhotoPop(props) {
  const { photo, currentUser, show, hide } = props

  return (
    <>
      <Modal
        show={show}
        onHide={hide}
        centered
        dialogClassName='modal-90w'
        aria-labelledby={`user-modal-${photo[0].id}`}
        
      >
        <Modal.Body>
          <div className='d-flex flex-row'>
            <img id={`${photo[0].id}`} alt={`${photo[0].content}`} className='userpop-img' src={photo[0].url} />
            <div className='userpop-container'>
              <div className='userpop-container-user'>
                <div>
                  {currentUser.username}
                </div>
                <div className='dropdown-divider'></div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}