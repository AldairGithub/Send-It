import React, { useState } from 'react'

import {Link} from 'react-router-dom'

import {resetPassword} from '../../services/password'

export default function ResetPassword(props) {
  const { token } = props.match.params
  const { id } = props.match.params
  
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: ""
  })
  const [passwordSubmitted, setPasswordSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userData.password === userData.confirmPassword) {
      await resetPassword(id, token, userData.password)
      setUserData({
        password: "",
        confirmPassword: ""
      })
      setPasswordSubmitted(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='New Password'
          type='text'
          name='password'
          value={userData.password}
          onChange={handleChange}
          disabled= {passwordSubmitted ? "disabled" : ""}
        />
        <input
          placeholder='Confirm New Password'
          type='text'
          name='confirmPassword'
          value={userData.confirmPassword}
          onChange={handleChange}
          disabled= {passwordSubmitted ? "disabled" : ""}
        />
        <button>Reset Password</button>
      </form>
      {passwordSubmitted ? 
        <>
          <Link to='/'><button>Go back to sign in</button></Link>
        </>
        :
        <>
        </>
      }
    </>
  )
}