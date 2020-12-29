import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'

import { allUserPhotos } from '../../../services/user'
import { postActionFromCurrentUser } from '../../../services/action'
import { deleteActionFromCurrentUser } from '../../../services/action'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import './DisplayPhoto.css'

export default function DisplayPhoto(props) {
  const { user, handleAction, actions, entity, currentUser } = props

  const [actionId, setActionId] = useState(null)
  const [liked, setLiked] = useState(false)

  const [userInput, setUserInput] = useState({
    comment: ""
  })


  useEffect(() => {
    checkForLike(actions)
  }, [])

  // check if current user has liked or commented on post
  const checkForLike = (arr) => {
    arr.forEach(action => {
      if (action.type_of_action === 'Like') {
        if (action.user_id === currentUser.id) {
          setActionId(action.id)
          setLiked(true)
        }
      }
    })
  }

  const userLikedPost = async (action, entityId, userId, typeOfEntity, typeOfAction) => {
    // because of React lifecycle, it is difficult to update likes from parent to child, since whenever page is rendered it does not
    // update the actions or likes props, thus by calling the delete and post directly from the child, and updating the page on the parent
    // component, we can keep state updated whenever the user likes something 
    if (action !== null) {
      const deleteLike = await deleteActionFromCurrentUser(action)
      setActionId(null)
      setLiked(false)
    } else {
      const postLike = await postActionFromCurrentUser(entityId, userId, typeOfEntity, typeOfAction)
      // actions array is empty when the like is called
      // need to update state with new Action id
      const newPhotos = await allUserPhotos(user.id)
      const result = newPhotos.filter(entity => entity[0].id === entityId)
      // cannot find actionId because it is undefined! Thats why it is not deleting the likes
      setActionId(result[0][1][0].id)
      setLiked(true)
    }
    // updates feed whenever a like is pressed
    handleAction()
    // using this function will always make the like button red, need to find workaround when user disliked photo
    // checkForLike(actions)
  }

  const getUserLikes = () => {
    let count = 0
    if (actions !== null) {
      actions.forEach(action => {
        if (action.type_of_action === 'Like') {
          count += 1
        }
      })
      if (count === 0) {
        return (
          <>
            <p style={{color: 'gray'}}>No one has liked this post yet</p>
          </>
        )
      } else {
        return (
          <>
            <strong>{count} like{ count === 1 ? "" : "s"}</strong>
          </>
        )
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInput({
      ...userInput,
      [name]: value
    })
  }

  const handleUserComment = async(entityId, userId, typeOfEntity, typeOfAction, userComment) => {
    const comment = await postActionFromCurrentUser(entityId, userId, typeOfEntity, typeOfAction, userComment)
    setUserInput({
      comment: ""
    })
    handleAction()
  }
  
  // allows rails created_at to be formatted into a date
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  })

  return (
    <>
      {/* display container */}
      <div className='display-container'>
        {/* user self img and username */}
        <div className='display-user-container d-flex flex-row justify-content-start'>
          <div className='display-user-self-img-container'>
            {user.user_img_self !== null ?
              <img className='display-user-self-img' src={user.user_self_img} />
              : <FontAwesomeIcon icon={faUserCircle} size='2x' />}
          </div>
          <div className='display-username-container'>
            <Link to={`/account/${user.username}`} style={{color: 'black'}}><p className='display-username-text'>{user.username}</p></Link>
          </div>
        </div>
        <div className='display-img-container'>
          <img className='display-img' src={ entity.url } alt={ entity.content }/>
        </div>
        {/* like & comment icon/
            likes number/
            post comment by user/
            View all comments will take user to modal/
            first two comments?/ Add a comment  */}
        <div className='d-flex flex-column align-items-stretch'>
          {/* like/comment icon */}
          <div className='d-flex flex-row display-icon'>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: `${liked ? 'red' : 'black'}` }}
              size='2x'
              onClick={(e) => userLikedPost(actionId, entity.id, currentUser.id, entity.name, 'Like')}
            />
            <div className='display-icon-right-space'></div>
            <FontAwesomeIcon icon={ faComment } size='2x' />
          </div>
          <div className='display-username-container'>
            { getUserLikes() }
          </div>
          <div className='d-flex flex-row' style={{ marginLeft: '15px'}}>
            <Link to={ `/account/${user.username}` } style={{color: 'black'}}><strong>{user.username}</strong></Link><p style={{marginLeft: '10px'}}>{ entity.content }</p>
          </div>
          <div style={{ marginLeft: '15px', color: 'gray'}}>
            {formatter.format(Date.parse(entity.created_at))}
          </div>
          <div>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Control
                    className='border-0 display-comment-input'
                    type='text'
                    placeholder='Add a comment...'
                    aria-label='New comment'
                    aria-describedby='New comment to post'
                    name='comment'
                    value={userInput.comment}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs='auto'>
                  <Button
                    onClick={() => handleUserComment(entity.id, currentUser.id, entity.name, 'Comment', userInput.comment)}
                    className='display-comment-button'
                    variant='link'
                    disabled={userInput.comment === "" ? true : false}
                  >
                    Post
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </div>
        </div>
      </div>

    </>
  )
}