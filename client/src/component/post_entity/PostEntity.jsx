import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { postEntity } from '../../services/entity'

import './PostEntity.css'

export default function PostEntity(props) {
  const { show, hide, currentUser, getUserProfile, postLength } = props

  const [userData, setUserData] = useState({
    image: ""
  })
  const [content, setContent] = useState({
    text: ""
  })
  const [message, setMessage] = useState({
    show: false,
    text: ""
  })

  const onFileChange = (e) => {
    e.persist()
    setUserData({
      ...userData,
      [e.target.name]: e.target.files[0]
    })
  }
  const onContentChange = (e) => {
    const { name, value } = e.target
    setContent({
      ...content,
      [name] : value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append("file", userData.image)
    form.append("upload_preset", "send-it")


    let findFileType = userData.image.name.indexOf('.')
    let fileType = userData.image.name.slice(findFileType)

    const returnPost = async (content, url, userId) => {
      await postEntity(content, url, userId)
    }
 
    if (postLength < 3) {
      if (userData.image !== "") {
        if (fileType === '.jpg' || fileType === '.jpeg' || fileType === '.png') {
          await fetch("https://api.cloudinary.com/v1_1/sendddditttt/image/upload", {
            method: 'POST',
            body: form
          }).then((res) => {
            if (res.ok) {
              return res.json()
            } else {
              return res.text().then(text => {
                let findMessage = Object.values(text).join("").indexOf('"message":')
                let errorMessage = Object.values(text).join("").slice(findMessage).replace(/"/g, '').replace(/}/g, '')
                setMessage({
                  show: true,
                  text: errorMessage.split(":")[1]
                })
                setContent({
                  text: ""
                })
                setUserData({
                  image: ""
                })
                throw new Error(text)
              })
            }
          })
            // on successful upload, let user know
            .then((responseJson) => {
              console.log('Success!')
              setMessage({
                show: true,
                text: 'Success!'
              })
              setContent({
                text: ""
              })
              let url = responseJson.secure_url
              // cant use async functions inside promises, so calling a function outside of them solves this
              returnPost(content.text, url, currentUser.id)
              setUserData({
                image: ""
              })
              // updates user profile on successful upload
              getUserProfile(currentUser.username)
            })
            .catch((error) => {
            console.log(error)
            })
        
        } 
      }

    } else {
      setContent({
        text: ""
      })
      setUserData({
        image: ""
      })
      setMessage({
        show: true,
        text: 'Number of maximum posts exceeeded. Limit is 9 posts per account...for now'
      })
    }
    getUserProfile(currentUser.username)

  }

  return (
    <>
      <Modal show={show} onHide={hide} size='md' centered>
        <Modal.Body className='post-entity-modal'>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <h4 className='post-entity-title'>Make a Post</h4>
            <p style={{ color: 'gray', fontSize: '15px' }}>Please be advised, uploading photos should be limited to 3 posts per account!</p>
            <hr />
            <Form onSubmit={(e) => onSubmit(e)}>
              <div className='form-group'>
                <input type='text' name='text' value={ content.text } className='form-control' aria-describedby='userContentPerPost' placeholder='Content' onChange={(e) => onContentChange(e) }/>
                <small className='form-text text-muted'>Add a description</small>
              </div>
              <input type="file" name='image' accept=".png, .jpg, .jpeg" onChange={(e) => onFileChange(e)} />
              <Button disabled={userData.image === "" ? true : false} className='post-entity-button' variant='primary' type='submit'>Post</Button>
              <div className='post-entity-message'>
                {message.show ? <><p>{ message.text }</p></> : null}
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}