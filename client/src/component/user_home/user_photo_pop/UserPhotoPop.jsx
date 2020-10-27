import React from 'react'
import Modal from 'react-bootstrap/Modal'

import './UserPhotoPop.css'

export default function UserPhotoPop(props) {
  const { photo, show, hide } = props

  return (
    <>
      <Modal show={show} onHide={hide} centered={true} transparent={true} >
        <Modal.Body>
          First modal using react bootstrap
        </Modal.Body>
      </Modal>
    </>
  )
}