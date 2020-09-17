import React from 'react'

import { removeToken } from '../../services/auth'
import { useHistory } from 'react-router-dom'

export default function SignOut(props) {
  const { setCurrentUser } = props
  const history = useHistory()

  const handleLogOut = () => {
    setCurrentUser(null)
    localStorage.removeItem("authToken")
    removeToken()
    history.push('/')
  }

  return (
    <>
      <button onClick={handleLogOut}>Sign Out</button>
    </>
  )
}