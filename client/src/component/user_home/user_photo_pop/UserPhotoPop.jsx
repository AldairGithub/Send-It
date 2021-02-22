import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import CommentButton from '../../user_home/user_photo_pop/comment_button/CommentButton'
import MoreUserLikes from '../../user_home/user_photo_pop/more_user_likes/MoreUserLikes'
import DeletePost from '../../user_home/user_photo_pop/delete_post/DeletePost'

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
    handleFollow,
    getUserProfile
  } = props

  const [userInput, setUserInput] = useState({
    comment: "",
  })

  const [commentModalOpen, setCommentModalOpen] = useState({
    show: false,
    commentId: null,
    commentUserId: null
  })
  const showCommentModal = (e, index, userId) => {
    setCommentModalOpen({
      show: true,
      commentId: index,
      commentUserId: userId
    })
  }
  const hideCommentModal = (e) => {
    setCommentModalOpen({
      show: false,
      commentId: null,
      commentUserId: null
    })
  }
  const handleCommentModal = (e, index) => {
    handleUserComment(index)
    hideCommentModal(e)
  }

  const [likesModal, setLikesModal] = useState({
    show: false
  })
  const showLikesModal = (e) => {
    setLikesModal({
      show: true
    })
  }
  const hideLikesModal = (e) => {
    setLikesModal({
      show: false
    })
  }
  
  const [deletePostModal, setDeletePostModal] = useState({
    show: false
  })
  const showDeletePostModal = (e) => {
    setDeletePostModal({
      show: true
    })
  }
  const hideDeletePostModal = (e) => {
    setDeletePostModal({
      show: false
    })
  } 

  // solves issue with modal not closing on browser back or forward button pressed by user
  const [locationKeys, setLocationKeys] = useState([])
  const history = useHistory()

  useEffect(() => {

    return history.listen(location => {
      if (history.action === 'PUSH') {
        setLocationKeys(([_, ...keys]) => keys)
        {hide()}
      } else {
        setLocationKeys((keys) => [location.key, ...keys])
        {hide()}
      }
    })
  }, [locationKeys, ])

  // On user click of the comment icon, input will be focused
  const userCommentInput = useRef(null)

  const handleFocus = () => {
    userCommentInput.current.focus()
  }

  const handleUserLike = (liked, entityId, actionId, typeOfEntity, typeOfAction) => {
    handleLike(liked, entityId, actionId, typeOfEntity, typeOfAction)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInput({
      ...userInput,
      [name]: value
    })
  }

  const handleUserComment = (actionId, entityId, userId, typeOfEntity, typeOfAction, userComment) => {
    handleComment(actionId, entityId, userId, typeOfEntity, typeOfAction, userComment)
    setUserInput({
      comment: ""
    })
  }

  const getUserLikes = () => {
    if (userLikes === null) {
      return null 
    } else if (userLikes.length === 0 || userLikes[0][1].user_self_img === null) {
      return 'https://i.imgur.com/PnUuUtU.jpg'
    } else {
      return userLikes[0][1].user_self_img
    }
  }

  const likedPostUsers = () => {
    if (userLikes === null) {
      return null
    } else if (userLikes.length === 0) {
      return (
        <>
          <p>No one liked your post yet</p>
        </>
      )
    } else if (userLikes.length === 1) {
      return (
        <>
          <p>Liked by
            <Link
              onClick={() => { hide() }}
              className='userpop-link-text'
              to={`/account/${userLikes[0][1].username}`}
            > {userLikes[0][1].username}</Link>
          </p>
        </>
      )
    } else if (userLikes.length === 2) {
      return (
        <>
          <p>Liked by
            <Link
              onClick={() => { hide() }}
              className='userpop-link-text'
              to={`/account/${userLikes[0][1].username}`}
            > {userLikes[0][1].username}</Link> and
            <Link
              onClick={() => { hide() }}
              className='userpop-link-text'
              to={`/account/${userLikes[1][1].username}`}
            > {userLikes[1][1].username}</Link>
          </p>
        </>
      )
    } else {
      return (
        <>
          <p>Liked by
            <Link
              onClick={() => { hide() }}
              className='userpop-link-text'
              to={`/account/${userLikes[0][1].username}`}
            > {userLikes[0][1].username}</Link> and
            <strong
              style={{ cursor: "pointer" }}
              onClick={(e) => showLikesModal(e)}
            > {userLikes.length - 1} others</strong>
          </p>
        </>
      )
    }
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

          <div className='userphoto-container'>
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
                  <p style={{cursor: "pointer"}} onClick={() => {hide()}}>{user.username}</p>
                </div>
                <div className='userpop-post-delete-button position-absolute'>
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    size='1x'
                    onClick={(e) => showDeletePostModal(e)}
                  />
                </div>
              </div>

              {/* divider */}
              <div className='dropdown-divider'></div>

              {/* username and content of photo */}
              <div className='d-flex flex-row flex-nowrap'>
                <div className='userpop-user-img-container'>
                  <img className='userpop-user-img' src={user.user_self_img}/>
                </div>
                <div className='userpop-user-text'>
                  <p><strong style={{cursor: "pointer"}} onClick={() => {hide()}}>{user.username}</strong> {photo[0].content}</p>
                </div>
              </div>

              <div className='userpop-comment-container position-relative'>
                {userComments.map((action, index) => (
                  <>
                    <div className='userpop-comment d-flex flex-row align-items-center flex-nowrap' key={index}>
                      <div className='userpop-user-img-container'>
                        <img className='userpop-user-img' alt={action[1].username} src={action[1][0].user_self_img ? action[1][0].user_self_img : 'https://i.imgur.com/FFn7QzH.jpg'}/>
                      </div>
                      <div className='userpop-user-text flex-wrap'>
                        <p><Link onClick={() => {hide()}} className='userpop-link-text' to={`/account/${action[1][0].username}`}>{action[1][0].username}</Link> {action[0].content}</p>
                      </div>
                      <div className='userpop-comment-delete-button position-absolute'>
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          size='1x'
                          onClick={(e) => showCommentModal(e, action[0].id, action[1][0].id)}
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
                    <div className='userpop-user-img-container'>
                      <img className='userpop-user-img' src={getUserLikes()} />
                    </div>
                    <div className='userpop-user-text'>
                        {likedPostUsers()}
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
          currentUser={currentUser}
          commentUserId={commentModalOpen.commentUserId}
          show={commentModalOpen.show}
          hide={hideCommentModal}
          deleteComment={(e) => handleCommentModal(e, commentModalOpen.commentId)}
        /> : null}
      {/* because on useEffect the modal is closed on browser back/forward button, it also closes this modal as well */}
      {likesModal.show ?
        <MoreUserLikes
          currentUser={currentUser}
          show={likesModal.show}
          hide={hideLikesModal}
          hideModal={hide}
          list={userLikes}
          handleFollow={handleFollow}
        /> : null}
      {deletePostModal.show ? 
        <DeletePost
          show={deletePostModal.show}
          hide={hideDeletePostModal}
          hidePost={hide}
          user={user}
          currentUser={currentUser}
          postId={photo[0].id}
          getUserProfile={getUserProfile}
        /> : null}
    </>
  )
}