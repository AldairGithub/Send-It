import React, { useState } from 'react'
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
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          type="text"
          name="username"
          value={setNewUserData.username}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={setNewUserData.password}
          onChange={handleChange}
        />
        <button>Sign In</button>
      </form>
      <p>Dont have an account?</p>
      <Link to='/register'><button>Sign Up</button></Link>
    </>
  )
}