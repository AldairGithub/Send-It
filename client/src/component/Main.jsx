import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { readAllUsers } from '../services/user'

import SignIn from './sign_in/SignIn'
import SignUp from './sign_up/SignUp'
import Home from './home/Home'

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
    <main>
      <Route exact path='/' render={(props) => (
        <SignIn
          {...props}
          setCurrentUser={setCurrentUser}
        />
      )} />
      <Route exact path='/register' render={(props) => (
        <SignUp
          {...props}
          setCurrentUser={setCurrentUser}
        />
      )} />
      <Route exact path='/home' render={(props) => (
        <Home
          {...props}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )} />
    </main>
  )
}