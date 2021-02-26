import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'

import { allUserPhotos, allUserRelationships } from '../../../services/user'
import { postActionFromCurrentUser } from '../../../services/action'
import { deleteActionFromCurrentUser } from '../../../services/action'
import { postNewUserRelationship } from '../../../services/user_relationship'
import { updateUserRelationship } from '../../../services/user_relationship'
import { deleteUserRelationship } from '../../../services/user_relationship'

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import HomePhotoPop from '../home_photo_pop/HomePhotoPop'

import './DisplayPhoto.css'

export default function DisplayPhoto(props) {
  const { user, handleAction, actions, entity, currentUser, allUsers } = props

  const [liked, setLiked] = useState(null)

  const [userInput, setUserInput] = useState({
    comment: ""
  })

  const [openPhotoModal, setOpenPhotoModal] = useState({
    show: false
  })
  const showPhotoModal = (e) => {
    setOpenPhotoModal({
      show: true
    })
  }
  const hidePhotoModal = (e) => {
    setOpenPhotoModal({
      show: false
    })
  }

  const [userAction, setUserAction] = useState({
    likes: [],
    comments: []
  })

  useEffect(() => {
    checkForLike(actions)
    getUsernameFromAction()
  }, [])

  // check if current user has liked or commented on post
  const checkForLike = (arr) => {
    arr.forEach(action => {
      if (action.type_of_action === 'Like') {
        if (action.user_id === currentUser.id) {
          setLiked(action.id)
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
      setLiked(null)
    } else {
      const postLike = await postActionFromCurrentUser(entityId, userId, typeOfEntity, typeOfAction)
      // actions array is empty when the like is called
      // need to update state with new Action id
      const newPhotos = await allUserPhotos(user.id)
      const result = newPhotos.filter(entity => entity[0].id === entityId)
      // cannot find actionId because it is undefined! Thats why it is not deleting the likes
      // need to filter through actions to get the correct id of the like, it was deleting other users likes otherwise
      const actionId = result[0][1].filter(action => {
        if (action.type_of_action === 'Like' && action.user_id === currentUser.id) {
          setLiked(action.id)
        }
      })
    }
    // updates feed whenever a like is pressed
    handleAction()
    getUsernameFromAction()
    // need updated props.actions in order to update likes/comments, bc handleAction() updates them getUsernameFromAction does not 
    // have them in time for update
    // using this function will always make the like button red, need to find workaround when user disliked photo
    // checkForLike(actions)
  }

  const getUserLikes = (arr) => {
    let count = 0
    if (arr !== null) {
      arr.forEach(str => {
        if (str.type_of_action === 'Like') {
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

  const handleUserComment = async (commentExists, entityId, userId, typeOfEntity, typeOfAction, userComment) => {
    if (commentExists) {
      const deleteComment = await deleteActionFromCurrentUser(commentExists)
    } else {
      const comment = await postActionFromCurrentUser(entityId, userId, typeOfEntity, typeOfAction, userComment)
    }
    setUserInput({
      comment: ""
    })
    // updates props.actions
    handleAction()
    // updates state with new comment, which is used in the modal
    getUsernameFromAction()

  }
  
  // allows rails created_at to be formatted into a date
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  })

  const getUsernameFromAction = async () => {
    const friends = await allUserRelationships(currentUser.id)
    // in order to update state without rerendering the whole page, we just need the actions
    const allUserActions = await allUserPhotos(user.id)

    const currentPhoto = allUserActions.filter(action => action[0].id === entity.id)
    const newActions = currentPhoto[0][1]

    const likes = newActions.filter(action => action.type_of_action === 'Like')
    const comments = newActions.filter(action => action.type_of_action === 'Comment')

    const likesAndUsernames = likes.map(like => [
      like,
      allUsers.filter(user => user.id === like.user_id)[0],
      friends.filter(friend => friend.user_one_id === like.user_id || friend.user_two_id === like.user_id)[0]
    ])
    const commentsAndUsernames = comments.map(comment => [
      comment,
      allUsers.filter(user => user.id === comment.user_id)[0],
      friends.filter(friend => friend.user_one_id === comment.user_id || friend.user_two_id === comment.user_id)[0]
    ])
    setUserAction({
      ...userAction,
      likes: likesAndUsernames,
      comments: commentsAndUsernames
    })
  }

  const handleFollow = async (relationshipId, userOneId, userTwoId, newStatus, lastActionId, data) => {
    if (relationshipId) {
      if (newStatus === 'Pending' || newStatus === 'Denied') {
        let userData = {
          user_one_id: userOneId,
          user_two_id: userTwoId,
          status: newStatus,
          last_user_action_id: lastActionId
        }
        let unfollowUser = await updateUserRelationship(relationshipId, userData)

      } else if (newStatus === 'Accepted') {
        let userData = {
          user_one_id: userOneId,
          user_two_id: userTwoId,
          status: newStatus,
          last_user_action_id: lastActionId
        }
        let followBack = await updateUserRelationship(relationshipId, userData)

      } else {
        let deleteFollow = await deleteUserRelationship(relationshipId)
      }
    } else {
      let followUser = await postNewUserRelationship(userOneId, userTwoId, newStatus, lastActionId)
    }
    // clicked on following the user literally deletes user likes
    getUsernameFromAction()
  }

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
          <img className='display-img' src={ entity.url } alt={ entity.content } onDoubleClick={(e) => userLikedPost(liked, entity.id, currentUser.id, entity.name, 'Like')}/>
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
              style={{ color: `${liked !== null ? 'red' : 'black'}` }}
              size='2x'
              onClick={(e) => userLikedPost(liked, entity.id, currentUser.id, entity.name, 'Like')}
            />
            <div className='display-icon-right-space'></div>
            <FontAwesomeIcon icon={ faComment } size='2x' />
          </div>
          <div className='display-username-container'>
            { getUserLikes(actions) }
          </div>
          <div className='d-flex flex-row flex-wrap' style={{ marginLeft: '15px'}}>
            <Link to={`/account/${user.username}`} style={{ color: 'black' }}><strong>{user.username}</strong></Link><p style={{marginLeft: '10px'}}>{ entity.content }</p>
          </div>
          <div style={{ marginLeft: '15px', color: 'gray', cursor: 'pointer' }} onClick={(e) => showPhotoModal(e)}>
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
                    onClick={() => handleUserComment(false, entity.id, currentUser.id, entity.name, 'Comment', userInput.comment)}
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
      {openPhotoModal.show ?
        <HomePhotoPop
          currentUser={currentUser}
          show={openPhotoModal.show}
          hide={hidePhotoModal}
          entity={entity}
          actions={actions}
          user={user}
          comments={userAction.comments}
          likes={userAction.likes}
          // updates user likes per state
          liked={liked}
          handleLike={userLikedPost}
          handleComment={handleUserComment}
          handleFollow={handleFollow}
        />
        : null}
    </>
  )
}