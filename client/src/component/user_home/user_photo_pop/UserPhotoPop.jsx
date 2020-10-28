import React from 'react'
import Modal from 'react-bootstrap/Modal'

import './UserPhotoPop.css'

export default function UserPhotoPop(props) {
  const { photo, show, hide } = props

  return (
    <>
      <Modal
        show={show}
        onHide={hide}
        centered={true}
        aria-labelledby={`user-modal-${photo[0].id}`}
      >
        <Modal.Header>
          <img id={`${photo[0].id}`} alt={`${photo[0].content}`} className='userpop-img' src={photo[0].url}/>
        </Modal.Header>
      </Modal>
    </>
  )
}