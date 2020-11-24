import React, { useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisH} from '@fortawesome/free-solid-svg-icons'

import CommentButton from '../../user_home/user_photo_pop/comment_button/CommentButton'

import './UserPhotoPop.css'

export default function UserPhotoPop(props) {
  const {
    photo,
    user,
    currentUser,
    userComments,
    userLikes,
    show, hide,
    likedPost,
    handleLike,
    handleComment,
    whoLikedPost,
    usersThatLikedPost
  } = props

  const [userInput, setUserInput] = useState({
    comment: "",
  })

  const [commentModalOpen, setCommentModalOpen] = useState({
    show: false,
    commentId: null
  })
  const showCommentModal = (e, index) => {
    setCommentModalOpen({
      show: true,
      commentId: index
    })
  }
  const hideCommentModal = (e) => {
    setCommentModalOpen({
      show: false,
      commentId: null
    })
  }
  const handleCommentModal = (e, index) => {
    handleUserComment(index)
    hideCommentModal(e)
  }

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
                  <img className='userpop-user-img' src={user.user_self_img}/>
                </div>
                <div className='userpop-user-text font-weight-bold'>
                  <p>{user.username}</p>
                </div>
              </div>

              {/* divider */}
              <div className='dropdown-divider'></div>

              {/* username and content of photo */}
              <div className='d-flex flex-row flex-nowrap'>
                <div className='userpop-user-img-container userpop-user-left-margin-20px'>
                  <img className='userpop-user-img' src={user.user_self_img}/>
                </div>
                <div className='userpop-user-text'>
                  <p><strong>{user.username}</strong> {photo[0].content}</p>
                </div>
              </div>

              <div className='userpop-comment-container position-relative'>
              {userComments.map(action => (
                <>
                  <div className='userpop-comment d-flex flex-row align-items-center flex-nowrap'>
                    <div className='userpop-user-img-container userpop-user-left-margin-20px'>
                      <img className='userpop-user-img' src={currentUser.user_self_img}/>
                    </div>
                    <div className='userpop-user-text flex-wrap'>
                      <p><strong>{action[1][0].username}</strong> {action[0].content}</p>
                    </div>
                    <div className='userpop-comment-delete-button position-absolute'>
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        size='2x'
                        onClick={(e) => showCommentModal(e, action[0].id)}
                      />  
                    </div>
                  </div>
                </>
              ))}
              </div>
              
              
              {/* other users can like, comment and see other usernames here */}
              <div className='userpop-features-container'>
              <div className='d-flex flex-column'>
                <div className=' d-flex flex-column flex-nowrap'> 
                  <div className='dropdown-divider'></div>
                  <div className='mb-3 d-flex flex-row flex-nowrap'>
                    <div className='userpop-icon-right-space'>
                      <FontAwesomeIcon
                        icon={faHeart}
                        size='2x'
                        style={{ color: `${likedPost ? "red" : "black"}` }}
                        onClick={() => handleUserLike(likedPost, photo[0].id, currentUser.id, photo[0].name, 'Like')}
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
                  {whoLikedPost(userLikes)}
                    <div className='userpop-user-img-container'>
                      <img className='userpop-user-img' src={userLikes.length === 0 || userLikes[0][1][0].user_self_img === null ? 'https://i.imgur.com/PnUuUtU.jpg' : `${userLikes[0][1][0].user_self_img}`}/>
                    </div>
                    <div className='userpop-user-text'>
                      {usersThatLikedPost}
                    </div>
                </div>
            
              </div>

                {/* Input comment */}
                <div className='userpop-input-container d-flex'>
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
                          onClick={() => handleUserComment(false, photo[0].id, currentUser.id, photo[0].name, 'Comment', userInput.comment)}
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
    
          </div>
        </Modal.Body>
      </Modal>
      {commentModalOpen.show  ?
        <CommentButton
          show={commentModalOpen.show}
          hide={hideCommentModal}
          deleteComment={(e) => handleCommentModal(e, commentModalOpen.commentId)}
        /> : null}
    </>
  )
}