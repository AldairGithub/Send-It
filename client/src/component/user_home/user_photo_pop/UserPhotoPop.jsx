import React, { useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { allUserPhotos } from '../../../services/user'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'


import './UserPhotoPop.css'

export default function UserPhotoPop(props) {
  const { photo, currentUser, userComments, userLikes, show, hide, likedPost, handleAction } = props

  const [comment, setComment] = useState(null)

  // On user click of the comment icon, input will be focused
  const userCommentInput = useRef(null)
  const handleFocus = () => {
    userCommentInput.current.focus()
  }

  const numberOfLikes = (arr) => {
    if (arr.length === 0) {
      return <p>No one liked your post yet</p>
    } else if (arr.length === 1) {
      return <p>Liked by <strong>{arr[0][1][0].username}</strong></p>
    } else if (arr.length === 2) {
      return <p>Liked by <strong>{arr[0][1][0].username}</strong> and <strong>{arr[1][1][0].username}</strong></p>
    } else {
      return <p>Liked by <strong>{arr[0][1][0].username}</strong> and <strong>{arr.length - 1} others</strong></p>
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
                        style={{ color: `${likedPost ? "red": "black"}`}}
                        onClick={() => handleAction(photo[0].id, photo[0].user_id, photo[0].name, 'Like', null)}
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
                  {userLikes.length > 0 ?
                    <>
                      <div className='userpop-user-img-container '>
                        <img className='userpop-user-img' src='https://i.imgur.com/PnUuUtU.jpg'/>
                      </div>
                      <div className='userpop-user-text'>
                        {numberOfLikes(userLikes)}
                      </div>
                    </>
                    :
                    <>
                      <div>
                        {numberOfLikes(userLikes)}
                      </div>
                    </>
                  }
                </div>
            
              </div>

              {/* Input comment */}
              <div className='userpop-input-container d-flex'>
                  <InputGroup className='mb-3 userpop-input'>
                    <FormControl
                      className='border-0 flex-grow-1 flex-fill'
                      placeholder='Add a comment...'
                      aria-label='New comment'
                      aria-describedby='new comment to post'
                      ref={userCommentInput}
                    />
                  <InputGroup.Append className='userpop-input-button'>
                      <Button
                        className='rounded justify-content-end'
                        variant='outline-secondary'
                      >Post</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>

            </div>
            
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}