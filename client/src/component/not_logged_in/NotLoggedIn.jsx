import React from 'react'
import Modal from 'react-bootstrap/Modal'

import { Link } from 'react-router-dom'

export default function NotLoggedIn(props) {
  const { show, hide } = props
  
  return (
    <>
      <Modal show={show} onHide={hide} centered>
        <Modal.Body>
          <div className='d-flex flex-column align-items-center'>
            <h5 style={{marginTop: '15px'}}>You need to be logged in to use Send It</h5>
            <p style={{ marginTop: '25px'}}>New to Send It? <Link to='/register'>Sign up</Link></p>
            <p style={{ marginBottom: '25px'}}>Already an user? <Link to='/'>Log in</Link></p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}