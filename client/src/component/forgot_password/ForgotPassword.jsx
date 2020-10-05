import React, { useState } from 'react'

import { removeToken } from '../../services/auth'
import { forgotPassword } from '../../services/password'

export default function ForgotPassword(props) {
  const { history } = props
  const [email, setEmail] = useState('')

  const handleChange = (e) => {
    const { value } = e.target
    setEmail(value)
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    const sendResetEmail = await forgotPassword(email)
    setEmail('')
    localStorage.removeItem("authToken")
    removeToken()
    history.push('/')
  }

  return (

    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Enter your password'
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
        />
        <button>Send Reset Link</button>
      </form>
    </>
  )
}