import React, { useState } from 'react'

import './SignIn.css'
import { loginUser } from '../../services/auth'
import { Link } from 'react-router-dom'

export default function SignIn(props) {
  const { setCurrentUser } = props
  const [newUserData, setNewUserData] = useState({
    username: "",
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
    const userData = await loginUser(newUserData)
    setCurrentUser(userData)
    props.history.push('/home')
  }

  return (
    <>
    <div className='container-sm'>
      <h1 className='title'>Send It</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='form-control'
          placeholder="Username"
          type="text"
          name="username"
          value={setNewUserData.username}
          onChange={handleChange}
        />
        <input
          className='form-control'
          placeholder="Password"
          type="password"
          name="password"
          value={setNewUserData.password}
          onChange={handleChange}
        />
        <button className='btn btn-lg btn-info btn-block'>Sign In</button>
        </form>
        <div className='forgot-password-container'>
          <Link className='forgot-password-link' to='/forgot_password'>Forgot Password?</Link>
        </div>
      </div>
      <div className='container-sm'>
        <div className='top-space'></div>
        <p>Dont have an account? <Link className='sign-link' to='/register'>Sign Up</Link></p>
      </div>
    </>
  )
}