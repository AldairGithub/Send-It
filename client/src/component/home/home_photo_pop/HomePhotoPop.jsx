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

export default function HomePhotoPop(props) {
  const { currentUser, show, hide, entity, user, actions, comments, likes, liked, handleLike, handleComment } = props

  const [userInput, setUserInput] = useState({
    comment: ""
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
  
  return (
    <>
      <Modal
        show={show}
        onHide={hide}
        centered
        dialogClassName='modal-90w'
      >
        <Modal.Body>
          <div className='d-flex flex-row justify-content-start'>

            <div className='home-img-container'>
              <img className='home-img' src={entity.url} alt={ entity.content }/>
            </div>

            <div className='home-info-container d-flex flex-column'>
              <div className='d-flex flex-row flex-nowrap'>

                <div className='home-user-img-container'>
                  <img className='home-user-img' src={ user.user_self_img }/>
                </div>
                <div className='home-user-text'>
                  <p style={{cursor: 'pointer', fontWeight: 'bold'}}>{ user.username }</p>
                </div>

              </div>

              <div className='dropdown-divider'></div>

              <div className='d-flex flex-row flex-nowrap'>
                <div className='home-user-img-container'>
                  <img className='home-user-img' src={ user.user_self_img }/>
                </div>
                <div className='home-user-text'>
                  <p><strong style={{cursor: 'pointer'}}>{user.username}</strong> { entity.content }</p>
                </div>
              </div>

              <div>
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
                          <img className='home-user-img' src={ comment[1].user_self_img }/>
                        </div>
                      }
                      <div className='home-user-text flex-wrap'>
                        {/* because the link is a different address, no need to hide modal on user click */}
                        <p><Link className='home-link-text' to={`/account/${comment[1].username}`}>{comment[1].username}</Link> { comment[0].content }</p>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          size='2x'
                          onClick={(e) => showCommentModal(e, comment[0].id)}
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
                    <div>

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
          show={commentModalOpen.show}
          hide={hideCommentModal}
          deleteComment={(e) => handleCommentModal(e, commentModalOpen.commentId)}
        /> : null  }
    </>
  )
}