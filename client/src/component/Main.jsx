import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { readAllUsers } from '../services/user'

import SignIn from './sign_in/SignIn'
import SignUp from './sign_up/SignUp'
import Home from './home/Home'
import UpdateUser from './update_user/UpdateUser'
import ForgotPassword from '../component/forgot_password/ForgotPassword'
import ResetPassword from '../component/reset_password/ResetPassword'
import UserHome from '../component/user_home/UserHome'

export default function Main(props) {
  const { currentUser, setCurrentUser } = props

  const [allUsers, setAllUsers] = useState([])
  // Because main render all components, it will always make the currentUser.id to null
  // By calling userPhotos and passing it down, we can update it the moment the user logs in
  const [userPhotos, setUserPhotos] = useState([])

  const [allUserPhotos, setAllUserPhotos] = useState()

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
          allUsers={allUsers}
          // no longer useful since we are rendering everything on the component
          setUserPhotos={setUserPhotos}
          setAllUserPhotos={setAllUserPhotos}
        />
      )} />

      <Route exact path='/update_account' render={(props) => (
        <UpdateUser
          {...props}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          allUsers={allUsers}
          setAllUsers={setAllUsers}
        />
      )} />

      <Route exact path='/forgot_password' render={(props) => (
        <ForgotPassword
          {...props}
        />
      )} />

      <Route exact path={`/reset_account/:id/:token`} render={(props) => (
        <ResetPassword
        {...props}
        />
      )} />

      
      <Route path={`/account/:user`} render={(props) => (
        <UserHome
          {...props}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )} />

    </main>
  )
}