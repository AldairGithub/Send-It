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
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Button from 'react-bootstrap/Button'

import Header from '../header/Header'
import UserPhotoPop from './user_photo_pop/UserPhotoPop'
import UserBioImg from '../user_home/user_bio_img/UserBioImg'
import UserFollowList from '../user_home/user-follow-list/UserFollowList'
import UserFollowButton from '../user_home/user_follow_button/UserFollowButton'
import NotLoggedIn from '../not_logged_in/NotLoggedIn'
import Footer from '../footer/Footer'
import PostEntity from '../post_entity/PostEntity'

export default function UserHome(props) {
  const {
    currentUser,
    setCurrentUser,
    history
    // need to check for user profile on all users
  } = props

  // display user info
  const [userProfile, setUserProfile] = useState({
    user: {},
    photos: []
  })
  const [currentUserPage, setCurrentUserPage] = useState({
    onPage: false,
    otherUser: null
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
    modalId: null
  })

  const [userAction, setUserAction] = useState({
    userLikes: null,
    userComments: null
  })
  const showModal = (e, index) => {
    setIsOpen({
      show: true,
      modalId: index
    })
    // check if current user liked the post
    // checks for user likes and comments from post
    currentUserLikedPost(index)
    handleUserActions(index)
  }
  const hideModal = (e) => {
    setIsOpen({
      show: false,
      modalId: null
    })
    setUserAction({
      userLikes: null,
      userComments: null
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

  const [userLoggedIn, setUserLoggedIn] = useState({
    show: false
  })
  const showUserLoggedIn = (e) => {
    setUserLoggedIn({
      show: true
    })
  }
  const hideUserLoggedIn = (e) => {
    setUserLoggedIn({
      show: false
    })
  }

  const [entityModal, setEntityModal] = useState({
    show: false
  })
  const showEntityModal = (e) => {
    setEntityModal({
      show: true
    })
  }
  const hideEntityModal = (e) => {
    setEntityModal({
      show: false
    })
  }

  useEffect(() => {
    // because we use getUserProfile on other functions to update user profile, we cant avoid this error message
    // we could go around this by simply writing the function inside useEffect and calling the function inside
    getUserProfile(props.match.params.user)
    // this line solves the warning line
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.user, currentUser])

  // updates DOM with their posts
  const getUserProfile = async (name) => {
    const getAllUsers = await readAllUsers()
    setAllUsers(getAllUsers)
    const getUser = getAllUsers.filter(user => user.username === name)
    const userPhotos = await allUserPhotos(getUser[0].id)
    getUserFollows(getUser[0].id, getAllUsers)
    setUserProfile({
      user: getUser[0],
      photos: userPhotos
    })
    handleIfOnCurrentUserPage(getUser[0])
  }

  const handleIfOnCurrentUserPage = async(user) => {
    // due to react lifestyle cycle, currentUser will always be null on the first render
    if (currentUser === null) {
      return null
    } else if (currentUser) {
      if (user.id === currentUser.id) {
        setCurrentUserPage({
          ...currentUserPage,
          onPage: true,
          otherUser: null
        })
      } else {
        const friends = await allUserRelationships(currentUser.id)
        const findFriend = friends.filter(relationship => relationship.user_one_id === user.id || relationship.user_two_id === user.id)
        setCurrentUserPage({
          ...currentUserPage,
          onPage: false,
          otherUser: [user, findFriend[0]]
        })
      }
    }
  }

  // Checks if the current user is in their page (renders user settings/add post), else it checks user relationship to current user
  const handleSettingsOrFollowFeature = (arg) => {
    if (arg) {
      return (
        <>
          <div className='p-2'>
            <Link to='/update_account'>
              <FontAwesomeIcon className='userlock' icon={faUserCog} size='2x'/>
            </Link>
          </div>
          <div className='p-2'>
            <FontAwesomeIcon icon={faCog} size='2x'/>
          </div>
          <div className='p-2'>
            <FontAwesomeIcon icon={faPlus} size='2x' onClick={ (e)=> showEntityModal(e)}/>
          </div>
        </>
      )
    } else {
      return <UserFollowButton relationship={currentUserPage.otherUser} currentUser={currentUser} handleFollow={handleFollow}/>
    }
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
  const getUserFollows = async (id, users) => {

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

// Renders DOM buttom on relationship to current user
  const isUserFollowingCurrentUser = (user, data) => {
    if (user[1].user_one_id === currentUser.id) {
      if (user[1].status === 'Pending') {
        // current user followed user, but user hasnt followed back
        return (
          <>
            <div className='ml-auto'>
              <Button onClick={() => { handleFollow(user[1].id, null, null, false, null, data) }} variant='light'>Following</Button>
            </div>
          </>
        )
      } else if (user[1].status === 'Denied') {
        if (user[1].last_user_action_id === currentUser.id) {
          // cu followed user, user followed back, cu unfollowed user, user still follows cu
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Accepted', currentUser.id, data) }} variant='info'>Follow</Button>
              </div>
            </>
          )
        } else {
          // cu followed user, user followed back, user unfollowed cu, cu still follows user
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(user[1].id, null, null, false, null, data) }} variant='danger'>Delete</Button>
              </div>
            </>
          )
        }
      } else if (user[1].status === 'Accepted') {
        return (
          <>
            <div className='ml-auto'>
              <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Denied', currentUser.id, data) }} variant='light'>Following</Button>
            </div>
          </>
        )
      }

    } else if (user[1].user_two_id === currentUser.id) {
      if (user[1].status === 'Pending') {
        return (
          <>
            <div className='ml-auto'>
              <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Accepted', currentUser.id, data) }} variant='info'>Follow</Button>
            </div>
          </>
        )
      } else if (user[1].status === 'Denied') {
        if (user[1].last_user_action_id === currentUser.id) {
          // user followed cu, cu followed back, cu unfollowed user, user still follows cu
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Accepted', currentUser.id, data) }} variant='info'>Follow</Button>
              </div>
            </>
          )
        } else {
          // user followed cu, cu followed back, user unfollowed cu, cu still follows user
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(user[1].id, null, null, false, null, data) }} variant='danger'>Delete</Button>
              </div>
            </>
          )
        }
      } else if (user[1].status === 'Accepted') {
        return (
          <>
            <div className='ml-auto'>
              <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Denied', currentUser.id, data) }} variant='light'>Following</Button>
            </div>
          </>
        )
      }
    } else {
      return (
        <>
          <div className='ml-auto'>
            <Button onClick={() => { handleFollow(false, currentUser.id, user[0].id, 'Pending', currentUser.id, data) }} variant='info'>Follow</Button>
          </div>
        </>
      )
    }
  }

// updateCurrentUserFriends will update current user home correctly, however when the current user follows/unfollows
// another user from another user page, it renders the user list with the info of the user the current user clicked on twice
  const handleFollow = async (relationshipId, userOneId, userTwoId, newStatus, lastActionId, data) => {
    if (relationshipId) {
      if (newStatus === 'Pending' || newStatus === 'Denied') {
        let userData = {
          user_one_id: userOneId,
          user_two_id: userTwoId,
          status: newStatus,
          last_user_action_id: lastActionId
        }
        await updateUserRelationship(relationshipId, userData)

      } else if (newStatus === 'Accepted') {
        let userData = {
          user_one_id: userOneId,
          user_two_id: userTwoId,
          status: newStatus,
          last_user_action_id: lastActionId
        }
        await updateUserRelationship(relationshipId, userData)

      } else {
        await deleteUserRelationship(relationshipId)

      }
    } else {
      await postNewUserRelationship(userOneId, userTwoId, newStatus, lastActionId)

    }
    // updates list in DOM
    // data is gathered from the user follow list, if it is absent then handleFollow is not called from the userFollowList Modal
    if (data === undefined) {
      // in case handleFollow is called from the moreLikes modal
      if (isOpen.show) {
        handleUserActions(isOpen.modalId)
        getUserFollows(userProfile.user.id, allUsers)
        // else it comes from the userhome page directly
      } else {
        getUserFollows(userProfile.user.id, allUsers)
        handleIfOnCurrentUserPage(userProfile.user)
      }
      // at the end, it comes from the followList modal
    } else {
      updateCurrentUserFriends(userProfile.user.id, data)
      getUserFollows(userProfile.user.id, allUsers)
    }
  }

  // creates array of users/relationship to current user(CU)
  const updateCurrentUserFriends = async (id, data) => {

    const friends = await allUserRelationships(id)
    const numberOfFollowers = []
    const numberOfFollowing = []

    friends.forEach(relationship =>
      allUsers.forEach(user => {
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

// check if buttons were checked at current user homepage, else it updates from the user page instead
// we want to update the DOM, since the call is made in the follow list, changing the list of users it is using is better 
    if (id === currentUser.id) {
      if (data.type === 'Followers') {
        setFollowModal({
          ...followModal,
          list: numberOfFollowers
        })
      } else {
        setFollowModal({
          ...followModal,
          list: numberOfFollowing
        })
      }
    } else {
        setRelationships({
          ...relationships,
          followers: numberOfFollowers,
          following: numberOfFollowing
        })
      // updates DOM when current user is in a different user page
      getCurrentUserFriends(currentUser.id, data)
    }

  }

  // updates current user followers/following list
  const getCurrentUserFriends = async (id, data) => {

    // changes the users received based on where the call was made from, whether followers or following list
    if (data.type === 'Followers') {
      data.users = relationships.followers
    } else {
      data.users = relationships.following
    }

    const friends = await allUserRelationships(id)

    const filterFriends = data.users.map(user => {
      if (user[1].user_one_id !== currentUser.id && user[1].user_two_id !== currentUser.id) {
        let newFilter = friends.filter(friend => friend.user_one_id === user[0].id || friend.user_two_id === user[0].id)
        return [user[0], newFilter[0]]
      } else {
        return user
      }
    })

    setFollowModal({
      ...followModal,
      list: filterFriends
    })
  }

  // just use it for comments for now
  const userActions = (id, type) => {
    // user has no photos available
    if (userProfile.photos[id] === undefined) {
      return null
    }
  
    let actions = userProfile.photos[id][1].filter(action => action.type_of_action === type)
    let usernameActions = actions.map(str => [str, allUsers.filter(user => user.id === str.user_id)])
  
    return usernameActions
  }

  // updating state will send data to the photo modal
  // creates array with likes/who liked post/relationship to current user post
  const handleUserActions = async (id) => {

    if (userProfile.photos[id] === undefined) {
      return null
    }

    const friends = await allUserRelationships(currentUser.id)
    // to update DOM need to call user photos, cannot use photos from state or it updates from the time the page was rendered
    const userPhotos = await allUserPhotos(userProfile.user.id)

    let likes = userPhotos[id][1].filter(action => action.type_of_action === 'Like')
    let comments = userPhotos[id][1].filter(action => action.type_of_action === 'Comment')
    let likesUsernameAndRelationship = likes.map(str =>
      [
        str,
        allUsers.filter(user => user.id === str.user_id)[0],
        friends.filter(relationship => relationship.user_one_id === str.user_id || relationship.user_two_id === str.user_id)[0]
      ])
      let commentsUsernameAndRelationship = comments.map(str =>
        [
          str,
          allUsers.filter(user => user.id === str.user_id)[0],
          friends.filter(relationship => relationship.user_one_id === str.user_id || relationship.user_two_id === str.user_id)[0]
        ])
    
    setUserAction({
      ...userAction,
      userLikes: likesUsernameAndRelationship,
      userComments: commentsUsernameAndRelationship
   })
  }

  // Updates likes per post in database
  const handleLike = async (liked, entityId, userId, typeOfEntity, typeOfAction) => {
    // finds the photo that was liked based on what modal is open currently
    let userLikedPost = userProfile.photos[isOpen.modalId][1].filter(action => action.type_of_action === 'Like' && action.user_id === currentUser.id)
    if (liked) {
      await deleteActionFromCurrentUser(userLikedPost[0].id)
      setLikedPost(false)   
    } else {
      await postActionFromCurrentUser(entityId, userId, typeOfEntity, typeOfAction)
      setLikedPost(true)
    }
    // recalling all photos with updated likes
    getUserProfile(props.match.params.user)
    // because handleUserActions updates the photos directly into the state, we call it directly
    handleUserActions(isOpen.modalId)
  }

  // if no actionId, then its a new comment, posts and deletes comments from database
  const handleComment = async (actionId, entityId, userId, typeOfEntity, typeOfAction, contentFromUser) => {
    if (actionId) {
      await deleteActionFromCurrentUser(actionId)
    } else {
      await postActionFromCurrentUser(entityId, userId, typeOfEntity, typeOfAction, contentFromUser)
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
        allUsers={allUsers}
      />
      <div style={{marginTop: '5%'}} >

        <div className='userhome-media '>

          <div className='userhome-container'>
          
            <div className='d-flex username-container userhome-container-bottomspace flex-row align-items-center'>
              <div className='userhome-user-img-container'>
                {/* user self image */}
                {userProfile.user.user_self_img === undefined || userProfile.user.user_self_img === null ? 
                <>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size={ window.innerWidth === 375 ? '3x' : '10x' }
                    color='gray'
                    onClick={(e) => currentUser !== null ? showUserBioModal(e) : showUserLoggedIn(e)}
                  />
                </>
                :
                <>
                  <img
                    alt={ `user avatar of ${userProfile.user.username}`}
                    className='userhome-user-img'
                    src={`${userProfile.user.user_self_img}`}
                    onClick={(e) => currentUser !== null ? showUserBioModal(e) : showUserLoggedIn(e)}
                  />
                </>
                }
              </div>
              <div className='p-2 username-title'>
                {userProfile.user.username}
              </div>
              {/* need to check if we are in the current user profile or a different user, then return either settings or follow feature */}
              {handleSettingsOrFollowFeature(currentUserPage.onPage)}
          </div>

          <div className='d-flex userhome-container-bottomspace flex-row'>
            <div className='p-2'>
              <strong>{userProfile.photos.length} Posts</strong>
            </div>
              <div className='p-2' style={{ cursor: "pointer" }} onClick={(e) => currentUser !== null ? showFollowModal(e, relationships.followers, 'Followers') : showUserLoggedIn(e)}>
              <strong>{relationships.followers.length} followers</strong>
            </div>
              <div className='p-2' style={{ cursor: "pointer" }} onClick={(e) => currentUser !== null ? showFollowModal(e, relationships.following, 'Following') : showUserLoggedIn(e)}>
              <strong>{relationships.following.length} following</strong>
            </div>
          </div>

          <div className='d-flex userhome-container-bio userhome-container-bottomspace flex-column align-items-start'>
            <div className='p-2'>
                {userProfile.user.name === null ? 'User has not updated their name yet' : userProfile.user.name}
            </div>
            <div className='p-2'>
              {userProfile.user.bio === null ? 'User has not updated their bio yet' : userProfile.user.bio}
            </div>
          </div>

        </div>

        </div>
        
        <hr />

        <div className='userhome-photos-container'>
        {userProfile.photos.map((arr, index) => (
          <>
            <div className='user-img-container' key={index} onClick={(e) => currentUser !== null ? showModal(e, index) : showUserLoggedIn(e)}>
              <img alt={ `posted by ${userProfile.user.username}, content: ${arr[0].content}` } className='user-img flex-fill' src={arr[0].url} />
              <div className='user-img-text'>
                <FontAwesomeIcon icon={faHeart} size='1x' />{getActionNumber(arr[1], 'Like')}
                <div className='userhome-right-space'/>
                <FontAwesomeIcon icon={faComment} size='1x'/>{getActionNumber(arr[1], 'Comment')}
              </div>
            </div>
          </>
        ))}
        </div>
        <div className='footer-space'></div>
      </div>
        <Footer currentUser={ currentUser }/>
      {/* modal */}
      {isOpen.show ?
        <UserPhotoPop
          photo={userProfile.photos[isOpen.modalId]}
          user={userProfile.user}
          userComments={userActions(isOpen.modalId, 'Comment')}
          userLikes={userAction.userLikes}
          currentUser={currentUser}
          show={isOpen.show} hide={hideModal}
          likedPost={likedPost}
          handleLike={handleLike}
          handleComment={handleComment}
          history={history}
          // for the likes modal
          handleFollow={handleFollow}
          // used to reload page after deleting post
          getUserProfile={getUserProfile}
        /> 
        : null}
      {userBio.show && userProfile.user.id === currentUser.id ?
        <UserBioImg
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          show={userBio.show}
          hide={hideUserBioModal}
          getUserProfile={getUserProfile}
        /> : null}
      {followModal.show ?
        <UserFollowList
          currentUser={currentUser}
          show={followModal.show}
          hide={hideFollowModal}
          users={followModal.list}
          type={followModal.type}
          handleFollow={handleFollow}
          isUserFollowingCurrentUser={isUserFollowingCurrentUser}
          getUserFollows={getUserFollows}
          getCurrentUserFriends={getCurrentUserFriends}
        /> : null}
      {entityModal.show ?
        <PostEntity
          show={entityModal.show}
          hide={hideEntityModal}
          currentUser={currentUser}
          getUserProfile={getUserProfile}
          postLength={userProfile.photos.length}
        /> : null}
      {userProfile.photos.length === 0 && 
        <>
          <p className='no-photos-yet'>User has not posted anything yet</p>
        </>}
      {userLoggedIn.show ? 
        <NotLoggedIn show={userLoggedIn.show} hide={ hideUserLoggedIn }/>
      : null}
    </>
  )
}