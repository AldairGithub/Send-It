import React from 'react'

import { useLocation } from 'react-router-dom'

import './Footer.css'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Footer(props) {
  const { currentUser } = props

  const location = useLocation()
  
  return (
    <>
      <div className='footer-bottom-space'></div>
      <nav className='on-phone navbar fixed-bottom navbar-light bg-light justify-content-center'>
        <div className='navbar-nav d-flex flex-row'>
          {currentUser !== null ?
            <>
              <Link className='nav-item nav-link' to='/home'><FontAwesomeIcon icon={faHouseUser} size='2x' color={ location.pathname === '/home' ? 'rgb(56,56,56)' : 'gray'}/></Link>
                <div style={{ marginRight: '100px' }}></div>
              <Link className='nav-item nav-link' to='/search'><FontAwesomeIcon icon={faSearch} size='2x' color={location.pathname === '/search' ? 'rgb(56,56,56)' : 'gray'}/></Link>
                <div style={{marginRight: '100px' }}></div>
              <Link className='nav-item nav-link' to={`/account/${currentUser.username}`}><FontAwesomeIcon icon={faUser} size='2x' color={ location.pathname === `/account/${currentUser.username}` ? 'rgb(56,56,56)' : 'gray'}/></Link>
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