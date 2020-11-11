import React, { useState, useEffect } from 'react'

import './UserHome.css'

import { Link } from 'react-router-dom'
import { postActionFromCurrentUser } from '../../services/action'
import { deleteActionFromCurrentUser } from '../../services/action'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/Header'
import UserPhotoPop from './user_photo_pop/UserPhotoPop'

export default function UserHome(props) {
  const { currentUser, setCurrentUser, userPhotos, userFriends, allUsers } = props

  // const currentUser = {username: 'admin'}

  const [relationships, setRelationships] = useState({
    followers: 0,
    following: 0
  })

  const [likedPost, setLikedPost] = useState(false)

  // Modal display
  const [isOpen, setIsOpen] = useState({
    show: false,
    modalId: null,
  })

  const showModal = (e, index) => {
    setIsOpen({
      show: true,
      modalId: index
    })
    // check if current user liked the post
    currentUserLikedPost(index)
  }
  const hideModal = (e) => {
    setIsOpen({
      show: false,
      modalId: null
    })
  }

  useEffect(() => {
    getUserFollows()
  }, [])

  const getActions = (arr, str) => {
    let count = 0
    arr.forEach(action => {
      if (action.type_of_action === str) {
        count += 1
      }
    })
    return count
  }

  const getUserFollows = () => {
    let numberOfFollowers = 0
    let numberOfFollowing = 0
    userFriends.forEach(user => {
      switch (user.status) {
        case 'Accepted':
          numberOfFollowers += 1
          numberOfFollowing += 1
          break;
        case 'Pending':
          numberOfFollowing += 1
          break;
        default:
          break;
      }
    })
    setRelationships({
      ...relationships,
      followers: numberOfFollowers,
      following: numberOfFollowing
    })
  }

  const userAction = (id , type) => {
    let userActions = userPhotos[id][1].filter(action => action.type_of_action === type)
    let usernameActions = userActions.map(str => [str, allUsers.filter(user => user.id === str.user_id)])
    return usernameActions
  }
  // need modal to display if current user has liked the post itself, need to check argument? or check array?
  // isOpen.modalId is the id of the photo

  const handleAction = (entityId, userId, typeOfEntity, typeOfAction, contentFromUser) => {
    let userLikedPost = userPhotos[isOpen.modalId][1].filter(action => action.type_of_action === 'Like' && action.user_id === userId)

    if (userLikedPost === undefined || userLikedPost.length === 0 ) {
      console.log('Post was liked by user')
      let postLike = postActionFromCurrentUser(entityId, userId, typeOfEntity, typeOfAction)
      setLikedPost(true)
    } else {
      console.log('Like was deleted from post by user')
      let deleteLike = deleteActionFromCurrentUser(userLikedPost[0].id)
      setLikedPost(false)
    }
  }

  const currentUserLikedPost = (id) => {
    const userLiked = userPhotos[id][1].filter(action => action.type_of_action === 'Like' && action.user_id === currentUser.id)
    if (userLiked.length === 0) {
      setLikedPost(false)
    } else {
      setLikedPost(true)
    }
  }
  
  return (
    <>
      <Header
        // currentUser={currentUser}
        // setCurrentUser={setCurrentUser}
      />
      <div className='userhome-container-topspace container'>

        <div className='d-flex position-relative flex-row justify-content-center align-items-stretch'>

          {/* user self image */}
          <div className='userhome-user-img-container'>
            {/* change user img with {currentUser.user_self_img} */}
            <img className='userhome-user-img' src='https://i.imgur.com/FFn7QzH.jpg'/>
          </div>

          <div className='d-flex position-relative userhome-container-info flex-shrink-0 flex-column align-items-stretch'>
          
          <div className='d-flex username-container userhome-container-bottomspace flex-row align-items-center flex-shrink-1'>
            <div className='p-2 username-title'>
              {/* {currentUser.username} */}
              adminnnnnnn
            </div>
            <div className='p-2'>
              <Link to='/update_account'>
                <FontAwesomeIcon className='userlock' icon={faUserCog} size='2x'/>
              </Link>
            </div>
            <div className='p-2'>
              <FontAwesomeIcon icon={faCog} size='2x'/>
            </div>
          </div>

          <div className='d-flex userhome-container-bottomspace flex-row flex-grow-2 justify-content-start'>
            <div className='p-2'>
              {userPhotos.length} Posts
            </div>
            <div className='p-2'>
              {relationships.followers} followers
            </div>
            <div className='p-2'>
              {relationships.following} following
            </div>
          </div>

          <div className='d-flex userhome-container-bio userhome-container-bottomspace flex-column align-items-start'>
            <div className='p-2'>
              {/* {currentUser.name} */}
              ADMIN
            </div>
            <div className='p-2'>
              {/* {currentUser.bio} */}
              WE ADD STUFF HERE FOR BIO
            </div>
          </div>

        </div>

        </div>
        
          
        
        
        <hr />

        <div className='d-flex flex-wrap-reverse justify-content-center'>
        {userPhotos.map((arr, index) => (
          <>
            <div className='user-img-container' onClick={(e) => showModal(e, index)}>
              <img className='user-img flex-fill' src={arr[0].url} />
              <div className='user-img-text'>
                <FontAwesomeIcon icon={faHeart} size='1x' />{getActions(arr[1], 'Like')}
                <div className='userhome-right-space'/>
                <FontAwesomeIcon icon={faComment} size='1x'/>{getActions(arr[1], 'Comment')}
              </div>
            </div>
          </>
        ))}
        </div>
      </div>
      {/* modal */}
      {isOpen.show ?
        <UserPhotoPop
          photo={userPhotos[isOpen.modalId]}
          userComments={userAction(isOpen.modalId, 'Comment')}
          userLikes={userAction(isOpen.modalId, 'Like')}
          currentUser={currentUser}
          show={isOpen.show} hide={hideModal}
          likedPost={likedPost}
          handleAction={handleAction}
        /> : null}
    </>
  )
}