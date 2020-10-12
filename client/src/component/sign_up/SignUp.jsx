import React, { useState } from 'react'

import './SignUp.css'

import { Link } from 'react-router-dom'
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
      <div className='text-center'>
      <h1 className='title' >Sign Up</h1>
      <form className='form' onSubmit={handleSubmit}>
          <input
            className='form-control'
          placeholder='username'
          type='text'
          name='username'
          value={newUserData.username}
          onChange={handleChange}
        />
          <input
            className='form-control'
          placeholder='email'
          type='text'
          name='email'
          value={newUserData.email}
          onChange={handleChange}
        />
          <input
            className='form-control'
          placeholder='password'
          type='password'
          name='password'
          value={newUserData.password}
          onChange={handleChange}
        />
        <button className='btn btn-lg btn-info btn-block'>Submit</button>
        </form>
        <div className='bottom-space'></div>
      </div>
      <div className='text-center'>
        <div className='top-space'></div>
        <p>Have an account? <Link className='sign-link' to='/'>Sign in</Link></p>
      </div>
    </>
  )
}