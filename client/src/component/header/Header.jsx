import React from 'react'
import { Link } from 'react-router-dom'

import SignOut from '../sign_out/SignOut'

export default function Header(props) {
  const { setCurrentUser } = props

  return (
    <div>
      <SignOut
        setCurrentUser={setCurrentUser}
      />
      <Link to='/update_account'><button>Update Account</button></Link>
    </div>
  )
}