import React, { useState, useEffect } from 'react'

import {resetPassword} from '../../services/password'

export default function ResetPassword(props) {
  const { token } = props.match.params
  
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: ""
  })

  // useEffect(() => {
  //   const getUserPasswordReset = resetPassword(token, userData.password)
  // }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const getUserPasswordReset = await resetPassword(token, userData.password)
    if (userData.password == userData.confirmPassword) {
      getUserPasswordReset()
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
        />
        <input
          placeholder='Confirm New Password'
          type='text'
          name='confirmPassword'
          value={userData.confirmPassword}
          onChange={handleChange}
        />
        <button>Reset Password</button>
      </form>
    </>
  )
}