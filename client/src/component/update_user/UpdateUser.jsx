import React, { useState, useEffect } from 'react'
import { updateUser } from '../../services/user'
import { useHistory } from 'react-router-dom'

export default function UpdateUser(props) {
  const history = useHistory()

  const { allUsers, setAllUsers, setCurrentUser } = props
  // because react updates everytime and this needs the id it is best to declare it automatically
  // const {currentUserId} = props
  const currentUserId = 1

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  useEffect(() => {
    defaultUserData()
  }, [allUsers])

  const defaultUserData = () => {
    const userExists = allUsers.find((user) => {
      return user.id === parseInt(currentUserId)
    })
    if (userExists) {
      setUserData({
        username: userExists.username,
        email: userExists.email,
        password: userExists.password
      })
    }
  }
// front end dev position in education - writing web components
  // tell me about yourself, whereabouts, projects
  // situations that were challenging
  // javascript, if we have a div with an idea of textbox(turn a textbox into an input field)
  // write a function into a palindrome
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedUser = await updateUser(currentUserId, userData)
    setAllUsers(
      allUsers.map((user) => {
        return user.id === parseInt(currentUserId) ? updatedUser : user
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
      <h4>Update Account</h4>
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