import React, { useState, useEffect } from 'react'

import './Home.css'

import { Link } from 'react-router-dom'
import { readAllUsers } from '../../services/user'
import { allUserPhotos } from '../../services/user'
import { allUserRelationships } from '../../services/user'
import { followingList } from '../utils/functions'
import { combineRelationshipToUserData } from '../utils/functions'

import Header from '../header/Header'
import DisplayPhoto from '../home/display_photo/DisplayPhoto'

export default function Home(props) {
  const { currentUser, setCurrentUser, allUsers, setUserPhotos, setAllUserPhotos } = props

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
      getAllUserPhotos(currentUser.id)
      getFollowingPostsForTimeline(currentUser.id)
    }
    // update userPhotos when a user likes a post
    setAllUserPhotos(() => getAllUserPhotos)
  }, [currentUser])

  const getAllUserPhotos = async (id) => {
    const photos = await allUserPhotos(id)
    setUserPhotos(photos)
  }

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
          />
          <div className='container d-flex justify-content-end'>
            <div>
              <Link to={`/account/${currentUser.username}`}><h4>{currentUser.username}</h4></Link>
            </div>
          </div>
          <div className='d-flex flex-column align-items-center'>
            {feed.available ? feed.photos.map((user, id) => (
              user[1].map((str, index) => (
                <>
                  <DisplayPhoto currentUser={currentUser} user={user[0][1]} entity={user[1][index][0]} actions={user[1][index][1]}  handleAction={handleAction}/>
                </>
              ))
            )) : null}
          </div>
        </>
      ) : (
          <>
            <div className='container d-flex flex-column justify-content-end'>
              <h4>New to Send It? <Link to='register'>Sign up</Link></h4>
              <h4>Already an user? <Link to='/'>Log in</Link></h4>
            </div>
        </>
      )}
    </div>
  )
}