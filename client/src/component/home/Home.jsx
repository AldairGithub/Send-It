import React, { useState, useEffect } from 'react'

import './Home.css'

import { Link } from 'react-router-dom'
import { allUserPhotos } from '../../services/user'
import { allUserRelationships } from '../../services/user'

import Header from '../header/Header'

export default function Home(props) {
  const { currentUser, setCurrentUser, setUserPhotos, setUserFriends } = props

  // We pass userId as a dependency on useEffect, whenever it changes it will fire off whatever functions are inside useEffect
  // Because useEffect is called on page render, it does not recognize currentUser.id as a value at first because it doesnt hold any data
  // Thus it doesnt render 
  useEffect(() => {
    getAllUserPhotos()
    getUserRelationships()
  }, [currentUser.id])

  const getAllUserPhotos = async () => {
    const photos = await allUserPhotos(currentUser.id)
    setUserPhotos(photos)
  }

  const getUserRelationships = async () => {
    const currentUserFriends = await allUserRelationships(currentUser.id)
    setUserFriends(currentUserFriends)
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
            <div className=''>
              <Link to={`/account/${currentUser.username}`}><h4>{currentUser.username}</h4></Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>User</h1>
        </>
      )}
    </div>
  )
}