import React, { useState, useEffect } from 'react'

import { readAllUsers } from '../services/user'

import SignIn from './sign_in/SignIn'

export default function Main(props) {
  const { currentUser } = props
  const { setCurrentUser } = props

  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])
  
  const getUsers = async () => {
    const users = await readAllUsers()
    setAllUsers(users)
  }

  return (
    <>
      <p>Main</p>
    </>
  )
}