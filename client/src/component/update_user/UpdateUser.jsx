import React, { useState, useEffect } from 'react'
import { updateUser } from '../../services/user'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
      <Link to='/'><h4>Update Account</h4></Link>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='username'
          type='text'
          name='username'
          value={userData.username}
          onChange={handleChange}
        />
        <input
          placeholder='email'
          type='text'
          name='email'
          value={userData.email}
          onChange={handleChange}
        />
        <input
          placeholder='password'
          type='text'
          name='password'
          value={userData.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </>
  )
}