import React from 'react'

import Header from '../header/Header'

export default function Home(props) {
  const { currentUser } = props
  const { setCurrentUser } = props

  return (
    <div>
      {currentUser !== null ? (
        <>
        <Header
          setCurrentUser={setCurrentUser}
        />
          <h1>Welcome {currentUser.username}</h1>
        </>
      ) : (
        <>
          <h1>Welcome User</h1>
        </>
      )}
    </div>
  )
}