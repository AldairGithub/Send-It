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
          <div className='container d-flex homepage-media'>
            <div className='homepage-container'>
              {currentUser.user_self_img === undefined || currentUser.user_self_img === null ?
                <>
                  <div className='homepage-user-self-img-container'>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      size='3x'
                    />
                  </div>
                </>
                : 
                <>
                  <div className='homepage-user-self-img-container'>
                    <img className='homepage-user-self-img' src={ currentUser.user_self_img}/>
                  </div>
                </>
              }
              <div>
                <Link className='homepage-link-text' to={`/account/${currentUser.username}`}><h4>{currentUser.username}</h4></Link>
                <p style={{color: 'gray'}}>{ currentUser.name }</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '25px'}}className='d-flex flex-column align-items-center'>
            {feed.available ? feed.photos.map((user, id) => (
              user[1].map((str, index) => (
                <>
                  <DisplayPhoto
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

// Links to images
// 
// racing, speedometer, sailing, wine, family gatherings, city views, sports, table settings, laughing 
// 
// https://i.imgur.com/y3AWTp0.jpg?1
// Porsche WEC
// https://unsplash.com/photos/6AtkTnXqeiI
// Photo by Philip Veater
// 
// https://i.imgur.com/eK85Eul.jpg
// Dirt bike racing
// https://unsplash.com/photos/-GE-xOGTt3w
// Photo by Harley-Davidson
// 
// https://i.imgur.com/zFnJN48.jpg
// Red racecar with speed effect
// https://unsplash.com/photos/yelIlsascr0
// Photo by Severin Demchuk
// 
// https://i.imgur.com/MRO1YDK.jpg
// Speedometer
// https://unsplash.com/photos/NN8sIzRvk-k
// Photo by Luís Sousa
// 
// https://i.imgur.com/qAaqtJP.jpg
// Subaru STI speedometer
// https://unsplash.com/photos/10x5iT14PLQ
// Photo by Anton Jansson
// 
// https://i.imgur.com/Ttjuph8.jpg
// sailing on clear water
// https://unsplash.com/photos/KiS25n89ph4
// Photo by Franz Schmitt
// 
// https://i.imgur.com/bBawAgq.jpg
// Family gathering view
// https://unsplash.com/photos/Hp6zYM9orZ4
// Photo by Inés Castellano
// 
// https://i.imgur.com/yoL9hDh.jpg
// Family dinner with wine serving
// https://unsplash.com/photos/RygIdTavhkQ
// Photo by Dave Lastovskiy
// 
// https://i.imgur.com/oduW6uk.jpg
// Speedboat dashboard
// https://unsplash.com/photos/jt8S_JhVn5A
// Photo by Simon Goetz
// 
// https://i.imgur.com/79gNmEr.jpg
// Plane view of mountains
// https://unsplash.com/photos/nud0w51mC00
// Photo by naomi tamar
// 
// https://i.imgur.com/BTRe0y8.jpg
// View of plane
// https://unsplash.com/photos/iUVqTyyRQGc
// Photo by Red Dot
// 
// https://i.imgur.com/zSfkjl1.jpg
// Highway speed
// https://unsplash.com/photos/8As6hrLM4Ec
// Photo by Scott Hewitt
// 
// https://i.imgur.com/JivmUBi.jpg
// Archer overlooks target
// https://unsplash.com/photos/jY9mXvA15W0
// Photo by Annie Spratt
// 
// https://i.imgur.com/xKnpvOL.jpg
// Cliff diving
// https://unsplash.com/photos/PebwygRbPCo
// Photo by Thijs Stoop
// 
// https://i.imgur.com/oxfLidC.jpg
// HM store in Times Square
// https://unsplash.com/photos/srNRVuOR_ZM
// Photo by Zane Lee
// 
// https://i.imgur.com/juhY3QN.jpg
// Flatiron Square
// https://unsplash.com/photos/jRco0idtT0c
// Photo by Lerone Pieters
// 
// 