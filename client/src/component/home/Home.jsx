import React, { useState, useEffect } from 'react'

import './Home.css'

import { Link } from 'react-router-dom'
import { readAllUsers } from '../../services/user'
import { allUserPhotos } from '../../services/user'
import { allUserRelationships } from '../../services/user'
import { followingList } from '../utils/functions'
import { combineRelationshipToUserData } from '../utils/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import Header from '../header/Header'
import DisplayPhoto from '../home/display_photo/DisplayPhoto'
import Footer from '../footer/Footer'

export default function Home(props) {
  const { currentUser, setCurrentUser, allUsers } = props

  const [feed, setFeed] = useState({
    available: false,
    photos: [null]
  })

  // We pass userId as a dependency on useEffect, whenever it changes it will fire off whatever functions are inside useEffect
  // Because useEffect is called on page render, it does not recognize currentUser.id as a value at first because it doesnt hold any data
  // Thus it doesnt render 
  useEffect(() => {
    if (currentUser === null) {
      return undefined
    } else {
      getFollowingPostsForTimeline(currentUser.id)
    }
  }, [currentUser])

  const getFollowingPostsForTimeline = async (id) => {
    const users = await readAllUsers()
    const relationship = await allUserRelationships(id)
    const list = followingList(relationship, id)
    const usersData = combineRelationshipToUserData(list, id, users)

    // can only make calls inside an async/await function
    const returnPhoto = async (user) => {
      let photo = await allUserPhotos(user[1].id)
      return [user, photo]
    }
    // usersData.map(async...) returns an array of promises
    // Promise.all returns the array into one promise 
    // We add await in front of Promise.all so only once all info has been obtained will it return
    const result = await Promise.all(usersData.map(async (user) => returnPhoto(user)))
    setFeed({
      available: true,
      photos: result
    })

  }

  const handleAction = () => {
    getFollowingPostsForTimeline(currentUser.id)
  }

  return (
    <div>
      {currentUser !== null ? (
        <>
          <Header
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            allUsers={allUsers}
          />
          <div className='container d-flex homepage-media'>
            <div className='homepage-container'>
              {currentUser.user_self_img === undefined || currentUser.user_self_img === null ?
                <>
                  <div className='homepage-user-self-img-container'>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      color='gray'
                      size='3x'
                    />
                  </div>
                </>
                : 
                <>
                  <div className='homepage-user-self-img-container'>
                    <img alt={ `user avatar by ${currentUser.username}` } className='homepage-user-self-img' src={ currentUser.user_self_img}/>
                  </div>
                </>
              }
              <div>
                <Link className='homepage-link-text' to={`/account/${currentUser.username}`}><h4>{currentUser.username}</h4></Link>
                <p style={{color: 'gray'}}>{ currentUser.name }</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '25px'}} className='d-flex flex-column align-items-center'>
            {feed.available ? feed.photos.map((user, id) => (
              user[1].map((str, index) => (
                <>
                  <DisplayPhoto
                    key={index}
                    currentUser={currentUser}
                    user={user[0][1]}
                    entity={user[1][index][0]}
                    actions={user[1][index][1]}
                    allUsers={allUsers}
                    handleAction={handleAction}
                  />
                </>
              ))
            )) : null}
            {feed.photos.length === 0 &&
              <>
                <div style={{ marginTop: '5%'}}></div>
                <hr />
                <p style={{ color: 'gray'}}>User is not following anyone right now</p>
              </>
            }
          </div>
        </>
      ) : (
          <>
            <Header currentUser={ null }/>
            <div className='container-sm d-flex flex-column align-items-center'>
              <h5 style={{marginTop: '15px'}}>You need to be logged in to use Send It</h5>
              <p style={{ marginTop: '25px'}}>New to Send It? <Link to='register'>Sign up</Link></p>
              <p style={{ marginBottom: '25px'}}>Already an user? <Link to='/'>Log in</Link></p>
            </div>
        </>
        )}
      <Footer currentUser={currentUser} />
    </div>
  )
}

