import React, {useState, useEffect, useRef} from 'react'

import './HomePhotoPop.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import CommentButton from '../../user_home/user_photo_pop/comment_button/CommentButton'
import MoreUserLikes from '../../user_home/user_photo_pop/more_user_likes/MoreUserLikes'

export default function HomePhotoPop(props) {
  const {
    currentUser,
    show,
    hide,
    entity,
    user,
    comments,
    likes,
    liked,
    handleLike,
    handleComment,
    handleFollow
  } = props

  const [userInput, setUserInput] = useState({
    comment: ""
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

  const [likesModalOpen, setLikesModalOpen] = useState({
    show: false
  })
  const showLikesModal = () => {
    setLikesModalOpen({
      show: true
    })
  } 
  const hideLikesModal = () => {
    setLikesModalOpen({
      show: false
    })
  }
  
  useEffect(() => {

  })

  const userCommentInput = useRef(null)

  const handleFocus = () => {
    userCommentInput.current.focus()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInput({
      ...userInput,
      [name]: value
    })
  }

  const handleUserLike = (wasItLiked, entityId, userId, typeOfEntity, typeOfAction) => {
    // function on displayphoto takes in the actionId (if user liked the post the actionId will be available)
    handleLike(wasItLiked, entityId, userId, typeOfEntity, typeOfAction)
  }
  const handleUserComment = (wasItCommented, entityId, userId, typeOfEntity, typeOfAction, content) => {
    handleComment(wasItCommented, entityId, userId, typeOfEntity, typeOfAction, content)
    setUserInput({
      comment: ""
    })
  }
  const handleCommentModal = (e, index) => {
    handleUserComment(index)
    hideCommentModal(e)
  }

  const doesPostHaveLikes = () => {
    if (likes === null) {
      return null
    } else if (likes.length === 0) {
      return (
        <>
          <div>
            {likedByUsers([])}
          </div>
        </>
      )
    } else if (likes.filter(like => like[2] !== undefined)) {
      const result = likes.filter(like => like[2] !== undefined)
      if (result[0][1].user_self_img === null) {
        return (
          <>
            <div className='home-user-img-container'>
              <FontAwesomeIcon
                icon={faUser}
                size='2x'
              />
            </div>
            <div className='home-user-text'>
              {likedByUsers(result)}
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className='home-user-img-container'>
              <img alt={ `user avatar of ${result[0][1].username}` }className='home-user-img' src={ result[0][1].user_self_img}/>
            </div>
            <div className='home-user-text'>
              {likedByUsers(result)}
            </div>
          </>
        )
      }
    }
  }

  const likedByUsers = (arr) => {
    if (arr === null || likes === null) {
      return null
    } else if (arr.length === 0 || likes.length === 0) {
      return (
        <> 
          <p style={{color: 'gray'}}>No one liked this post yet</p>
        </>
      )
    } else if (arr.length === 1) {
      return (
        <>
          <p>Liked by 
            <Link
              to={`/account/${arr[0][1].username}`}
              className='home-link-text'
            > {arr[0][1].username}</Link>
            {likes.length > 1 ?
            <>
              <strong onClick={ (e)=> showLikesModal(e)} style={{ cursor: 'pointer' }}> and {likes.length - 1} other{likes.length - 1 === 1 ? "" : "s"}</strong>
            </> : null}
          </p>
        </>
      )
    } else if (arr.length >= 2) {
      return (
        <>
          <p>Liked by
           <Link
              to={`/account/${arr[0][1].username}`}
              className='home-link-text'
            > {arr[0][1].username}</Link>{likes.length > 2 ? "," : " and"}
            <Link
              to={`/account/${arr[1][1].username}`}
              className='home-link-text'
            > {arr[1][1].username}</Link>
            {likes.length > 2 ?
              <>
                <strong onClick={ (e)=> showLikesModal(e)} style={{cursor: 'pointer'}}> and { likes.length - 1} others</strong>
              </> : null}
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
      >
        <Modal.Body>
          <div className='homephoto-container'>

            <div className='home-img-container'>
              <img className='home-img' src={entity.url} alt={ entity.content }/>
            </div>

            <div className='home-info-container d-flex flex-column'>
              <div className='d-flex flex-row flex-nowrap'>

                <div className='home-user-img-container'>
                  <img alt={ `user avatar of ${user.username}` } className='home-user-img' src={ user.user_self_img }/>
                </div>
                <div className='home-user-text'>
                  <p style={{cursor: 'pointer', fontWeight: 'bold'}}>{ user.username }</p>
                </div>

              </div>

              <div className='dropdown-divider'></div>

              <div className='d-flex flex-row flex-nowrap'>
                <div className='home-user-img-container'>
                  <img alt={ `user avatar of ${user.username}` } className='home-user-img' src={ user.user_self_img }/>
                </div>
                <div className='home-user-text'>
                  <p><strong style={{cursor: 'pointer'}}>{user.username}</strong> { entity.content }</p>
                </div>
              </div>

              <div className='homephoto-comment-container'>
                {comments.map((comment, index) => (
                  <>
                    <div className='d-flex flex-row align-items-center flex-nowrap' key={index}>
                      {comment[1].user_self_img === null ? 
                        <>
                          <div className='home-user-img-container'>
                            <FontAwesomeIcon icon={ faUser } size='2x'/>
                          </div>
                        </>
                        : 
                        <div className='home-user-img-container'>
                          <img alt={ `comment made by ${comment[1].username}` } className='home-user-img' src={ comment[1].user_self_img }/>
                        </div>
                      }
                      <div className='home-user-text flex-wrap'>
                        {/* because the link is a different address, no need to hide modal on user click */}
                        <p><Link className='home-link-text' to={`/account/${comment[1].username}`}>{comment[1].username}</Link> { comment[0].content }</p>
                      </div>
                      <div className='home-comment-delete-button position-absolute'>
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          size='2x'
                          onClick={(e) => showCommentModal(e, comment[0].id, comment[1].id)}
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
                      
              {/* like icon */}
              <div className='home-features-container'>
                <div className='d-flex flex-column'>
                  <div className='d-flex flex-column flex-nowrap'>
                    <div className='dropdown-divider'></div>
                    <div className='mb-3 d-flex flex-row flex-nowrap'>
                      <div style={{ marginRight: '15px'}}>
                        <FontAwesomeIcon
                          icon={faHeart}
                          size='2x'
                          style={{ color: `${liked !== null ? "red" : "black"}` }}
                          onClick={() => handleUserLike(liked, entity.id, currentUser.id, entity.name, 'Like')}
                        />
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={faComment}
                          size='2x'
                          onClick={handleFocus}
                        />
                      </div>
                    </div>

                    {/* user likes goes here along with the more likes modal */}
                    <div className='d-flex flex-row justify-content-start'>
                      {doesPostHaveLikes()}
                    </div>


                  </div>

                  {/* user comments */}
                  <div className='home-input-container d-flex'>
                    <Form>
                      <Form.Row className='align-items-center'>
                        <Col xs={8}>
                          <Form.Control
                            className='home-input border-0'
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
                            className='home-input-button'
                            variant='info'
                            disabled={userInput.comment === "" ? true : false}
                            onClick={() => handleUserComment(false, entity.id, currentUser.id, entity.name, 'Comment', userInput.comment)}
                          >
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
      {commentModalOpen.show ? 
        <CommentButton
          currentUser={currentUser}
          commentUserId={commentModalOpen.commentUserId}
          show={commentModalOpen.show}
          hide={hideCommentModal}
          deleteComment={(e) => handleCommentModal(e, commentModalOpen.commentId)}
        /> : null}
      {likesModalOpen.show ? 
        <MoreUserLikes
          currentUser={currentUser}
          show={likesModalOpen.show}
          hide={hideLikesModal}
          hideModal={hide}
          list={likes}
          handleFollow={handleFollow}
        />
      : null}
    </>
  )
}