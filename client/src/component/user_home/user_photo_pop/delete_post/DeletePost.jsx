import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {deleteEntity} from '../../../../services/entity'

export default function DeletePost(props) {
  const { show, hide, user, currentUser, hidePost, postId, getUserProfile } = props

  const handleDelete = async (id) => {
    await deleteEntity(id)
    getUserProfile(currentUser.username)
  }
  
  const handleClick = (e, id) => {
    handleDelete(id)
    hide()
    hidePost()
  }

  return (
    <>
      <Modal show={show} onHide={hide} centered>
        <Modal.Body>
          {user.username === currentUser.username ?
            <>
              <div className='d-flex justify-content-center' style={{ marginBottom: '15px'}}>
                <Button onClick={ (e) => handleClick(e, postId) } variant='danger'>Delete Post</Button>
              </div>
            </>
            :
            <>
              <div className='d-flex justify-content-center' style={{ marginBottom: '15px'}}>
                <Button variant='info'>Repost Post</Button>
              </div>
            </>}
        </Modal.Body>
      </Modal>
    </>
  )
}