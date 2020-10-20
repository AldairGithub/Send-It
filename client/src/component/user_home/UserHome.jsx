import React from 'react'

import './UserHome.css'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Header from '../header/Header'

export default function UserHome(props) {
  const { currentUser, setCurrentUser, userPhotos } = props


  
  return (
    <>
      {/* <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      /> */}
      <div className='userhome-container-topspace container'>
        <div className='row justify-content-md-center'>
          <div className='col-sm-1'>
            admin
          </div>
          <div className='col-sm-1'>
            <Link to='/update_account'>
              <FontAwesomeIcon className='userlock' icon={faUserCog} size='2x'/>
            </Link>
          </div>
          <div className='col-sm-1'>
            <FontAwesomeIcon icon={faCog} size='2x'/>
          </div>
        </div>

        <hr />

        <div className='d-flex flex-wrap-reverse justify-content-center'>
        {userPhotos.map((arr) => (
          <>
            <div>
              <img className='user-img flex-fill' src={arr[0].url}/>
            </div>
          </>
        ))}
      </div>


      </div>

      
      
    </>
  )
}