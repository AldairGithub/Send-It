import React from 'react'

import './Header.css'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { useHistory } from 'react-router-dom'
import { logOut } from '../log_out/LogOut'

export default function Header(props) {
  const { currentUser } = props
  const { setCurrentUser } = props
  const history = useHistory()

  const handleLogOut = () => {
    setCurrentUser(null)
    logOut()
    history.push('/')
  }

  return (
    <>
      <nav className='navbar sticky-top navbar-expand-lg navbar-light bg-light'>
        <h1 className='navbar-brand'>Send It</h1>
        <div className='collapse navbar-collapse justify-content-end navbar-space-right'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/home'><FontAwesomeIcon icon={faHouseUser} size='2x'/></Link>
            </li>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <FontAwesomeIcon icon={faUser} size='2x'/>
                </a>
              <div className='dropdown-menu'>
                {/* <Link to={`/account/${currentUser.username}`}><p className='dropdown-item'>Profile</p></Link> */}
                <p className='dropdown-item'>Saved</p>
                <Link to='/update_account'><p className='dropdown-item'>Settings</p></Link>
                <div className="dropdown-divider"></div>
                {/* <p className='dropdown-item' onClick={handleLogOut}>Log Out</p> */}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}