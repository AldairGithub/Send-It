import React, { useState, useEffect } from 'react'

import './UpdateUser.css'

import Header from '../header/Header'

import { Link } from 'react-router-dom'
import { updateUser } from '../../services/user'
import { useHistory } from 'react-router-dom'

export default function UpdateUser(props) {
  const history = useHistory()

  const { allUsers, setAllUsers, currentUser, setCurrentUser } = props
  // because react updates everytime and this needs the id it is best to declare it automatically
  // const currentUserId = 1

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [user, setUser] = useState({})

  useEffect(() => {
    defaultUserData()
  }, [allUsers])

  const defaultUserData = () => {
    const userExists = allUsers.find((user) => {
      return user.id === parseInt(currentUser.id)
    })
    if (userExists) {
      setUserData({
        username: userExists.username,
        email: userExists.email,
        password: userExists.password
      })
    }
    // we can use password_digest and created_at to create a hash for updating user passwords
    setUser(userExists)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedUser = await updateUser(currentUser.id, userData)
    setAllUsers(
      allUsers.map((user) => {
        return user.id === parseInt(currentUser.id) ? updatedUser : user
      })
    )
    setCurrentUser(userData)
    history.push('/home')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }

  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <div className='container-md rounded'>
        <form className='form' onSubmit={handleSubmit}>

          <div className='form-group row'>
            <label for='updateUsername' className='col-sm-3 col-form-label'>Username</label>
              <div className='col-sm-8'>
                <input
                  id='updateUsername'
                  className='form-control'
                  placeholder='username'
                  type='text'
                  name='username'
                  value={userData.username}
                  onChange={handleChange}
                />
            </div>
          </div>

            <hr className='solid' />

            <div className='personal-info-title'>
              <h4 className=''>Personal Information</h4>
              <p className='font-weight-lighter'>This won't be a part of your public profile</p>
            </div>

            <div className='form-group row'>
              <label for='updateEmail' className='col-sm-3 col-form-label'>Email</label>
                <div className='col-sm-8'>
                  <input
                    id='updateEmail'
                    className='form-control'
                    placeholder='email'
                    type='text'
                    name='email'
                    value={userData.email}
                    onChange={handleChange}
                  />
              </div>
            </div>
            
        <button className='btn btn-md btn-info btn-block'>Submit</button>
        </form>
      </div>
    </>
  )
}