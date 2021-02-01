import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { updateUser } from '../../../services/user'
import { deleteAvatarFromCloud } from '../../../services/user'

import './UserBioImg.css'

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

    // we cant send the string directly to the api call (user controller can only take user parameters), so we are sending the complete url
    // and slicing the string from the backend server
    // To prevent too many users from uploading too many avatars (users should have one only) we delete the old avatar first
    // Then we call the upload

    let findFileType = userData.image.name.indexOf('.')
    let typeOfFile = userData.image.name.slice(findFileType)

    if (userData.image !== "") {
      if (typeOfFile === '.jpg' || typeOfFile === '.jpeg' || typeOfFile === '.png') {
        setError({
          show: true,
          message: "Success!"
        })
        const deleteImgFromCloud = await deleteAvatarFromCloud(currentUser.id, { user_self_img: currentUser.user_self_img })
        const response = await fetch("https://api.cloudinary.com/v1_1/sendddditttt/image/upload", {
          method: 'POST',
          body: form
        })
        const file = await response.json()

        const updatedUser = await updateUser(currentUser.id, { user_self_img: file.secure_url })
        getUserProfile(currentUser.name)
        
      } else {
        setError({
          show: true,
          message: "Image must be a jpg, jpeg, or png file"
        })
      }
    }

    // const deleteImgFromCloud = await deleteAvatarFromCloud(currentUser.id, { user_self_img: currentUser.user_self_img })
    
    // const response = await fetch("https://api.cloudinary.com/v1_1/sendddditttt/image/upload", {
    //   method: 'POST',
    //   body: form
    // })

    // const file = await response.json()

    // const updatedUser = await updateUser(currentUser.id, { user_self_img: file.secure_url })
    // getUserProfile(currentUser.name)
    // hide()
  }

  return (
    <>
      <Modal show={show} onHide={hide} size='md' centered>
        <Modal.Body className='userbio-modal'>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <h4 className='userbio-title'>Change Current Profile Photo</h4>
            <hr />
            <Form onSubmit={(e) => onSubmit(e)}>
              <input type="file" name="image" onChange={(e) => onChange(e)} />
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