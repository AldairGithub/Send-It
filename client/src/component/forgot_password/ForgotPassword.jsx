import React, { useState } from 'react'

import './ForgotPassword.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'

import { removeToken } from '../../services/auth'
import { forgotPassword } from '../../services/password'
import { Link } from 'react-router-dom'

export default function ForgotPassword(props) {
  const { history } = props
  const [email, setEmail] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setEmail(value)
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    await forgotPassword(email)
    setEmail('')
    localStorage.removeItem("authToken")
    removeToken()
    history.push('/')
  }

  return (
    <>
    <div className='container-sm'>
      <div className='forgot-password-container'>
        <FontAwesomeIcon icon={faUserLock} size='3x'/>
        <h2>Problem logging in?</h2>
      </div>
      <p>Please enter your email and we will send you a link to get back to your account</p>
      <form className='form'onSubmit={handleSubmit}>
        <input
          className='form-control'
          placeholder='Enter your password'
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
        />
        <button className='btn btn-lg btn-info btn-block'>Send Reset Link</button>
      </form>
      <div className='dropdown-divider'></div>
      <div className='bottom-space'>
        <Link className='sign-link' to='register'>Create New Account</Link>
      </div>
      </div>
      <div className='container-sm'>
        <div className='top-space'>
          <p><Link className='sign-link' to='/'>Back To Log In</Link></p>
        </div>
      </div>
    </>
  )
}