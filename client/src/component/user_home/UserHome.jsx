import React, { useState, useEffect } from 'react'

import './UserHome.css'

import { Link } from 'react-router-dom'
import { postActionFromCurrentUser } from '../../services/action'
import { deleteActionFromCurrentUser } from '../../services/action'
import { readAllUsers } from '../../services/user'
import { allUserPhotos } from '../../services/user'
import { allUserRelationships } from '../../services/user'
import { postNewUserRelationship } from '../../services/user_relationship'
import { updateUserRelationship } from '../../services/user_relationship'
import { deleteUserRelationship } from '../../services/user_relationship'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/Header'
import UserPhotoPop from './user_photo_pop/UserPhotoPop'
import UserBioImg from '../user_home/user_bio_img/UserBioImg'
import UserFollowList from '../user_home/user-follow-list/UserFollowList'

export default function UserHome(props) {
  const {
    currentUser,
    setCurrentUser
    // need to check for user profile on all users
  } = props

  // display user info
  const [userProfile, setUserProfile] = useState({
    user: {},
    photos: []
  })
  const [allUsers, setAllUsers] = useState()

  const [relationships, setRelationships] = useState({
    followers: [],
    following: []
  })

  const [likedPost, setLikedPost] = useState(false)

  // Post Modal display
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

// User Bio display
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

  // User followers display
  const [followModal, setFollowModal] = useState({
    show: false,
    list: null,
    type: null
  })
  const showFollowModal = (e, array, set) => {
    setFollowModal({
      show: true,
      list: array,
      type: set
    })
  }
  const hideFollowModal = (e) => {
    setFollowModal({
      show: false,
      list: null,
      type: null
    })
  }

  useEffect(() => {
    getUserProfile(props.match.params.user)
  }, [props.match.params.user])

  const getUserProfile = async(name) => {
    const getAllUsers = await readAllUsers()
    setAllUsers(getAllUsers)
    const getUser = getAllUsers.filter(user => user.username === name)
    const userPhotos = await allUserPhotos(getUser[0].id)
    getUserFollows(getUser[0].id, getAllUsers)
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

  // when current user followed an user, and user followed them back. If current user wants to unfollow the same user
  // it deletes the user from the followers list instead of the following list from current user
  const getUserFollows = async(id, users) => {

    const friends = await allUserRelationships(id)
    const numberOfFollowers = []
    const numberOfFollowing = []

    friends.forEach(relationship =>
      users.forEach(user => {
        if (user.id === id) {
          return null
          // user followed current user
        } else if (user.id === relationship.user_one_id) {
          if (relationship.status === 'Pending') {
            numberOfFollowers.push([user, relationship])
          } else if (relationship.status === 'Accepted') {
            numberOfFollowers.push([user, relationship])
            numberOfFollowing.push([user, relationship])
          } else if (relationship.status === 'Denied') {
            if (relationship.last_user_action_id === user.id) {
              // user follows CU, CU follows back, user unfollows CU, CU is still following user
              numberOfFollowing.push([user, relationship])
            } else {
              // user follows CU, CU follows back, CU unfollows user, user is still following CU
              numberOfFollowers.push([user, relationship])
            }
          } 
          // current user followed user
        } else if (user.id === relationship.user_two_id) {
          if (relationship.status === 'Pending') {
            numberOfFollowing.push([user, relationship])
          } else if (relationship.status === 'Accepted') {
            numberOfFollowers.push([user, relationship])
            numberOfFollowing.push([user, relationship])
          } else if (relationship.status === 'Denied') {
            if (relationship.last_user_action_id === user.id) {
              // CU follows user, user follows back, user unfollows CU, CU is still following user
              numberOfFollowing.push([user, relationship])
            } else {
              // CU follows user, user follows back, CU unfollows user, user is still following CU
              numberOfFollowers.push([user, relationship])
            }
          }
        }
      })
    )
    setRelationships({
      ...relationships,
      followers: numberOfFollowers,
      following: numberOfFollowing
    })
  }

  const handleFollow = async (relationshipId, userOneId, userTwoId, newStatus, lastActionId) => {
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
    // when the current user follows/unfollows from another user list, the follows list gets updated to the currentUser!
    getUserFollows(currentUser.id, allUsers)
  }

  const userAction = (id, type) => {
    if (userProfile.photos === undefined) {
      return null
    }
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
              {/* {userProfile.user.id === currentUser.id ?
                <> */}
                  <div className='p-2'>
                    <Link to='/update_account'>
                      <FontAwesomeIcon className='userlock' icon={faUserCog} size='2x'/>
                    </Link>
                  </div>
                  <div className='p-2'>
                    <FontAwesomeIcon icon={faCog} size='2x'/>
                  </div>
                {/* </> : null} */}
          </div>

          <div className='d-flex userhome-container-bottomspace flex-row flex-grow-2 justify-content-start'>
            <div className='p-2'>
              <strong>{userProfile.photos.length} Posts</strong>
            </div>
              <div className='p-2' style={{ cursor: "pointer" }} onClick={(e) => showFollowModal(e, relationships.followers, 'Followers')}>
              <strong>{relationships.followers.length} followers</strong>
            </div>
              <div className='p-2' style={{ cursor: "pointer" }} onClick={(e) =>  showFollowModal(e, relationships.following, 'Following')}>
              <strong>{relationships.following.length} following</strong>
            </div>
          </div>

          <div className='d-flex userhome-container-bio userhome-container-bottomspace flex-column align-items-start'>
            <div className='p-2'>
                {userProfile.user.name === null ? 'need to update name and allow user to add spaces' : userProfile.user.name}
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
            <div className='user-img-container' key={index} onClick={(e) => showModal(e, index)}>
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
          handleComment={handleComment}
        /> : null}
      {userBio.show ?
        <UserBioImg
          show={userBio.show}
          hide={hideUserBioModal}
        /> : null}
      {followModal.show ?
        <UserFollowList
          currentUser={currentUser}
          show={followModal.show}
          hide={hideFollowModal}
          users={followModal.list}
          type={followModal.type}
          handleFollow={handleFollow}
        /> : null}
    </>
  )
}