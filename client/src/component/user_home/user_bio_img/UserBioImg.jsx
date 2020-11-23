import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import './UserBioImg.css'

export default function UserBioImg(props) {
  const { show, hide } = props

  return (
    <>
      <Modal show={show} onHide={hide} size='md' centered>
        <Modal.Body className='userbio-modal'>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <h4 className='userbio-title'>Change Current Profile Photo</h4>
            <hr />
            <Button className='comment-button' variant='primary'>Upload Photo</Button>
            <Button className='comment-button' variant='danger'>Delete Current Photo</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
    )
}