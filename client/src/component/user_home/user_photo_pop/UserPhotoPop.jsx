import React, { useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { allUserPhotos } from '../../../services/user'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'


import './UserPhotoPop.css'

export default function UserPhotoPop(props) {
  const {
    photo,
    currentUser,
    userComments,
    userLikes,
    show, hide,
    likedPost,
    handleLike,
    handleComment,
    whoLikedPost,
    usersThatLikedPost,
  } = props

  const [userInput, setUserInput] = useState({
    comment: "",
  })

  // On user click of the comment icon, input will be focused
  const userCommentInput = useRef(null)

  const handleFocus = () => {
    userCommentInput.current.focus()
  }

  const handleUserLike = (liked, entityId, actionId, typeOfEntity, typeOfAction) => {
    handleLike(liked, entityId, actionId, typeOfEntity, typeOfAction)
    whoLikedPost(userLikes)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInput({
      ...userInput,
      [name]: value,
    })
  }


  const handleUserComment = (actionId, entityId, userId, typeOfEntity, typeOfAction, userComment) => {
    handleComment(actionId, entityId, userId, typeOfEntity, typeOfAction, userComment)
    setUserInput({
      comment: ""
    })
  }


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

          <div className='d-flex flex-row justify-content-start'>
            {/* image */}
            <div className='userpop-img-container'>
              <img
                className='userpop-img'
                src={photo[0].url}
                alt={photo[0].content}
              />
            </div>

            {/* column for user info */}
            <div className='userpop-info-container d-flex flex-column'>

              {/* top of column/user img and username */}
              <div className='userpop-user-container d-flex flex-row flex-nowrap'>
                <div className='userpop-user-img-container userpop-user-left-margin-20px'>
                  <img className='userpop-user-img' src={currentUser.user_self_img}/>
                </div>
                <div className='userpop-user-text font-weight-bold'>
                  <p>{currentUser.username}</p>
                </div>
              </div>

              {/* divider */}
              <div className='dropdown-divider'></div>

              {/* username and content of photo */}
              <div className='userpop-user-container d-flex flex-row flex-nowrap'>
                <div className='userpop-user-img-container userpop-user-left-margin-20px'>
                  <img className='userpop-user-img' src={currentUser.user_self_img}/>
                </div>
                <div className='userpop-user-text'>
                  <p><strong>{currentUser.username}</strong> {photo[0].content}</p>
                </div>
              </div>

              {userComments.map(action => (
                <>
                  <div className='userpop-user-container d-flex flex-row align-items-center flex-nowrap'>
                    <div className='userpop-user-img-container userpop-user-left-margin-20px'>
                      <img className='userpop-user-img' src='https://i.imgur.com/PnUuUtU.jpg'/>
                    </div>
                    <div className='userpop-user-text'>
                      <p><strong>{action[1][0].username}</strong> {action[0].content}</p>
                    </div>
                    <button onClick={() => handleUserComment(action[0].id)}>Delete</button>
                  </div>
                </>
              ))}
              
              {/* other users can like, comment and see other usernames here */}
              <div className='d-flex flex-column justify-content-end flex-fill'>
              <div className=' d-flex flex-column flex-nowrap'>
                <div className='dropdown-divider'></div>
                  <div className='mb-3 userpop-user-container d-flex flex-row flex-nowrap'>
                    <div className='userpop-icon-right-space'>
                      <FontAwesomeIcon
                        icon={faHeart}
                        size='2x'
                        style={{ color: `${likedPost ? "red" : "black"}` }}
                        onClick={() => handleUserLike(likedPost, photo[0].id, photo[0].user_id, photo[0].name, 'Like')}
                      />
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faComment}
                        size='2x'
                        onClick={handleFocus} />
                    </div>
                </div>
                
                {/* Post likes and usernames, neeed to add links for each of their profile */}
                <div className='userpop-user-container d-flex flex-row flex-nowrap'>
                  {whoLikedPost(userLikes) ?
                    <>
                      <div className='userpop-user-img-container '>
                        <img className='userpop-user-img' src='https://i.imgur.com/PnUuUtU.jpg'/>
                      </div>
                      <div className='userpop-user-text'>
                        {usersThatLikedPost}
                      </div>
                    </>
                    :
                    <>
                      <div>
                        {usersThatLikedPost}
                      </div>
                    </>
                  }
                </div>
            
              </div>

              {/* Input comment */}
                <div className='userpop-input-container d-flex'>
                  {/* <Form onSubmit={(e) => handleSubmit(true, photo[0].id, photo[0].user_id, photo[0].name, 'Comment', userInput.comment)}> */}
                  <Form>
                    <Form.Row className='align-items-center'>
                      <Col xs={8}>
                        <Form.Control
                          className='border-0 userpop-input'
                          type='text'
                          placeholder='Add a comment...'
                          aria-label='New comment'
                          aria-describedby='New comment to post'
                          ref={userCommentInput}
                          name='comment'
                          value={userInput.comment}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col xs='auto'>
                        <Button
                          onClick={() => handleUserComment(false, photo[0].id, photo[0].user_id, photo[0].name, 'Comment', userInput.comment)}
                          className='userpop-input-button'
                          variant='info'
                          disabled={userInput.comment === "" ? true : false}>
                          Post
                        </Button>
                      </Col>
                    </Form.Row>
                  </Form>
                </div>
              </div>

            </div>
            
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}