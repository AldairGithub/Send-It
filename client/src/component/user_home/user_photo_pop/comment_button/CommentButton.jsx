import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './CommentButton.css'

export default function CommentButton(props) {
  const {show, hide, deleteComment} = props
  return (
    <>
      <Modal show={show} onHide={hide} centered size='sm'>
        <Modal.Body>
          <div className='d-flex align-items-center justify-content-center'>
            <Button
              className='comment-button'
              size='lg'
              onClick={deleteComment}
              variant='danger'
            >Delete
            </Button>
          </div> 
        </Modal.Body>
      </Modal>
    </>
  )
}