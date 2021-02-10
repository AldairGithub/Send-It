import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { updateUser } from '../../../services/user'
import { deleteAvatarFromCloud } from '../../../services/user'

import './UserBioImg.css'
import { faRss } from '@fortawesome/free-solid-svg-icons'

export default function UserBioImg(props) {
  const { show, hide, currentUser, userOnPage, getUserProfile } = props

  const [userData, setUserData] = useState({
    image: ""
  })
  const [error, setError] = useState({
    show: false,
    message: ""
  })

  const onChange = (e) => {
    e.persist()
    setUserData({
      ...userData,
      [e.target.name]: e.target.files[0]
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append("file", userData.image)
    form.append("upload_preset", "send-it")

    const updateUserImg = async (id, old_url, new_url) => {
      const deletedFromDatabase = await deleteAvatarFromCloud(id, { user_self_img: old_url })
      const updateUserAvata = await updateUser(id, { user_self_img: new_url })
    }

    // we cant send the string directly to the api call (user controller can only take user parameters), so we are sending the complete url
    // and slicing the string from the backend server
    // To prevent too many users from uploading too many avatars (users should have one only) we delete the old avatar first
    // Then we call the upload

    let findFileType = userData.image.name.indexOf('.')
    let typeOfFile = userData.image.name.slice(findFileType)

    if (userData.image !== "") {
      if (typeOfFile === '.jpg' || typeOfFile === '.jpeg' || typeOfFile === '.png') {
        const response = await fetch("https://api.cloudinary.com/v1_1/sendddditttt/image/upload", {
          method: 'POST',
          body: form
        }).then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            return res.text().then(text => {
              let findError = Object.values(text).join("").indexOf('"message":')
              let errorMessage = Object.values(text).join("").slice(findError).replace(/"/g, '').replace(/}/g, '')

              setError({
                show: true,
                message: errorMessage.split(":")[1]
              })
              throw new Error(text)
            })
          }
        })
          .then((responseJson) => {
            console.log('Success!')
            updateUserImg(currentUser.id, currentUser.user_self_img, responseJson.secure_url)

            setError({
              show: true,
              message: 'Success!'
            })
          })
          // catches server errors
          .catch((error) => {
          console.log(error)
        })
      }
    }
  }

  // Updates user avatar on hide modal
  const resetDom = () => {
    getUserProfile(currentUser.username)
    hide()
  }

  return (
    <>
      <Modal show={show} onHide={resetDom} size='md' centered>
        <Modal.Body className='userbio-modal'>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <h4 className='userbio-title'>Change Current Profile Photo</h4>
            <p style={{color: 'gray'}}>Only one image per account can be uploaded as an avatar</p>
            <hr />
            <Form onSubmit={(e) => onSubmit(e)}>
              <input type="file" name="image" accept=".png, .jpg, .jpeg" onChange={(e) => onChange(e)} />
              <Button disabled={userData.image === "" ? true : false} className='userbio-button' variant='primary' type="submit">Upload Photo</Button>
              <div className='userbio-error-message'>
                {error.show ? <><p>{ error.message }</p></> : null}
              </div>
            </Form>
            {/* <Button className='comment-button' variant='danger'>Delete Current Photo</Button> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
    )
}