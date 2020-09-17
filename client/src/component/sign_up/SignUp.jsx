import React, { useState } from 'react'

import { registerUser } from '../../services/auth'
import { useHistory } from 'react-router-dom'

export default function SignUp(props) {
  const { setCurrentUser } = props
  const history = useHistory()
  
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewUserData({
      ...newUserData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = await registerUser(newUserData)
    setCurrentUser(userData)
    history.push('/home')
  }

  return (
    <>
      <h4>Sign Up</h4>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='username'
          type='text'
          name='username'
          value={newUserData.username}
          onChange={handleChange}
        />
        <input
          placeholder='email'
          type='text'
          name='email'
          value={newUserData.email}
          onChange={handleChange}
        />
        <input
          placeholder='password'
          type='password'
          name='password'
          value={newUserData.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </>
  )
}