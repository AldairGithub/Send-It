import React, { useState, useEffect } from 'react'

import './UserHome.css'

import { Link } from 'react-router-dom'
import { postActionFromCurrentUser } from '../../services/action'
import { deleteActionFromCurrentUser } from '../../services/action'
import { readAllUsers } from '../../services/user'
import { allUserPhotos } from '../../services/user'
import { allUserRelationships } from '../../services/user'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/Header'
import UserPhotoPop from './user_photo_pop/UserPhotoPop'
import UserBioImg from '../user_home/user_bio_img/UserBioImg'

export default function UserHome(props) {
  const {
    currentUser,
    setCurrentUser,
    // need to check for user profile on all users
    allUsers
  } = props

  const [relationships, setRelationships] = useState({
    followers: 0,
    following: 0
  })

  const [likedPost, setLikedPost] = useState(false)

  const [usersThatLikedPost, setUsersThatLikedPost] = useState()

  const [userProfile, setUserProfile] = useState({
    user: {},
    photos: []
  })

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

// user can change their bio img using modal
  const [userBio, setUserBio] = useState({
    show: false
  })
  const showUserBioModal = (e) => {
    setUserBio({
      show: true
    })
  }
  const hideUserBioModal = (e) => {
    setUserBio({
      show:false
    })
  }

  useEffect(() => {
    getUserProfile(props.match.params.user)
  }, [props.match.params.user])

  const getUserProfile = async(name) => {
    const getAllUsers = await readAllUsers()
    const getUser = getAllUsers.filter(user => user.username === name)
    const userPhotos = await allUserPhotos(getUser[0].id)
    getUserFollows(getUser[0].id)
    setUserProfile({
      user: getUser[0],
      photos: userPhotos
    })
  }

  const getActionNumber = (arr, str) => {
    let count = 0
    arr.forEach(action => {
      if (action.type_of_action === str) {
        count += 1
      }
    })
    return count
  }

  const getUserFollows = async(id) => {
    let numberOfFollowers = 0
    let numberOfFollowing = 0
    const friends = await allUserRelationships(id)
    friends.forEach(user => {
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
    let userActions = userProfile.photos[id][1].filter(action => action.type_of_action === type)
    let usernameActions = userActions.map(str => [str, allUsers.filter(user => user.id === str.user_id)]) 
    return usernameActions
  }

  const handleLike = async(liked, entityId, userId, typeOfEntity, typeOfAction) => {
    let userLikedPost = userProfile.photos[isOpen.modalId][1].filter(action => action.type_of_action === 'Like' && action.user_id === currentUser.id)
    if (liked) {
      let deleteLike = await deleteActionFromCurrentUser(userLikedPost[0].id)
      setLikedPost(false)
    } else {
      let postLike = await postActionFromCurrentUser(entityId, userId, typeOfEntity, typeOfAction)
      setLikedPost(true)
    }
    // recalling all photos with updated likes
    getUserProfile(props.match.params.user)
  }

  // if no actionId, then its a new comment
  const handleComment = async (actionId, entityId, userId, typeOfEntity, typeOfAction, contentFromUser) => {
    if (actionId) {
      let deleteUserComment = await deleteActionFromCurrentUser(actionId)
    } else {
      let postComment = await postActionFromCurrentUser(entityId, userId, typeOfEntity, typeOfAction, contentFromUser)
    }
    getUserProfile(props.match.params.user)
  }

  // change color of like status if user liked post
  const currentUserLikedPost = (id) => {
    const userLiked = userProfile.photos[id][1].filter(action => action.type_of_action === 'Like' && action.user_id === currentUser.id)
    if (userLiked.length === 0) {
      setLikedPost(false)
    } else {
      setLikedPost(true)
    }
  }

  const whoLikedPost = (arr) => {
    if (arr.length === 0) {
    setUsersThatLikedPost('No one liked your post yet')
    } else if (arr.length === 1) {
    setUsersThatLikedPost(`Liked by ${arr[0][1][0].username}`)
    } else if (arr.length === 2) {
    setUsersThatLikedPost(`Liked by ${arr[0][1][0].username} and ${arr[1][1][0].username}`)
    } else {
    setUsersThatLikedPost(`Liked by ${arr[0][1][0].username} and ${arr.length - 1} others`)
    }
  }
  
  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <div className='userhome-container-topspace container'>

        <div className='d-flex position-relative flex-row justify-content-center align-items-stretch'>

          {/* user self image */}
          <div className='userhome-user-img-container'>
            <img
              className='userhome-user-img'
              src={userProfile.user.user_self_img === undefined ? 'https://i.imgur.com/FFn7QzH.jpg' : `${userProfile.user.user_self_img}`}
              onClick={(e) => showUserBioModal(e)}
            />
          </div>

          <div className='d-flex position-relative userhome-container-info flex-shrink-0 flex-column align-items-stretch'>
          
          <div className='d-flex username-container userhome-container-bottomspace flex-row align-items-center flex-shrink-1'>
            <div className='p-2 username-title'>
                {userProfile.user.username}
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
              {userProfile.photos.length} Posts
            </div>
              <div className='p-2'>
                {/* need to add relationships based on username */}
              {relationships.followers} followers
            </div>
            <div className='p-2'>
              {relationships.following} following
            </div>
          </div>

          <div className='d-flex userhome-container-bio userhome-container-bottomspace flex-column align-items-start'>
            <div className='p-2'>
                {userProfile.user.name === null ? 'need to update name' : userProfile.user.name}
            </div>
            <div className='p-2'>
              {userProfile.user.bio === null ? 'need to update user bio' : userProfile.user.bio}
            </div>
          </div>

        </div>

        </div>
        
          
        
        
        <hr />

        <div className='d-flex flex-wrap-reverse justify-content-center'>
        {userProfile.photos.map((arr, index) => (
          <>
            <div className='user-img-container' onClick={(e) => showModal(e, index)}>
              <img className='user-img flex-fill' src={arr[0].url} />
              <div className='user-img-text'>
                <FontAwesomeIcon icon={faHeart} size='1x' />{getActionNumber(arr[1], 'Like')}
                <div className='userhome-right-space'/>
                <FontAwesomeIcon icon={faComment} size='1x'/>{getActionNumber(arr[1], 'Comment')}
              </div>
            </div>
          </>
        ))}
        </div>
      </div>
      {/* modal */}
      {isOpen.show ?
        <UserPhotoPop
          photo={userProfile.photos[isOpen.modalId]}
          user={userProfile.user}
          userComments={userAction(isOpen.modalId, 'Comment')}
          userLikes={userAction(isOpen.modalId, 'Like')}
          currentUser={currentUser}
          show={isOpen.show} hide={hideModal}
          likedPost={likedPost}
          handleLike={handleLike}
          whoLikedPost={whoLikedPost}
          usersThatLikedPost={usersThatLikedPost}
          handleComment={handleComment}
        /> : null}
      {userBio.show ?
        <UserBioImg
          show={userBio.show}
          hide={hideUserBioModal}
        /> : null}
    </>
  )
}