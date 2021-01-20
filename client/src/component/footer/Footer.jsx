import React from 'react'

import './Footer.css'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function Footer(props) {
  const { currentUser } = props
  
  return (
    <>
      <nav className='on-phone navbar fixed-bottom navbar-expand-lg navbar-light bg-light justify-content-center'>
        <div className='navbar-nav d-flex flex-row'>
          {currentUser !== null ?
            <>
              <Link className='nav-item nav-link' to='/home'><FontAwesomeIcon icon={faHouseUser} size='2x'/></Link>
                <div style={{marginRight: '100px'}}></div>
              <Link className='nav-item nav-link' to={`/account/${currentUser.username}`}><FontAwesomeIcon icon={ faUser } size='2x'/></Link>
            </>
            :
            <>
              <Link className='nav-item nav-link' to='/register'><FontAwesomeIcon icon={faUserPlus} size='2x'/></Link>
                <div style={{ marginRight: '100px' }}></div>
              <Link className='nav-item nav-link' to='/'><FontAwesomeIcon icon={ faSignInAlt } size='2x'/></Link>
            </>
          }
        </div>
      </nav>
    </>
  )
}