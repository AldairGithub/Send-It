import React from 'react'

import SignOut from '../sign_out/SignOut'

export default function Header(props) {
  const { setCurrentUser } = props

  return (
    <div>
      <SignOut
        setCurrentUser={setCurrentUser}
      />
    </div>
  )
}