import React, { useState } from 'react'

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

  const [errorUsername, setErrorUsername] = useState({
    status: false,
    message: ""
  })
  const [errorEmail, setErrorEmail] = useState({
    status: false,
    message: ""
  })
  const [errorPassword, setErrorPassword] = useState({
    status: false,
    message: ""
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
    try {
      const userData = await registerUser(newUserData)
      setCurrentUser(userData)
      history.push('/home')
    } catch (error) {
      setErrorUsername({
        status: error.response.data.username ? true : false,
        message: error.response.data.username
      })
      setErrorEmail({
        status: error.response.data.email ? true : false,
        message: error.response.data.email
      })
      setErrorPassword({
        status: error.response.data.password ? true : false,
        message: error.response.data.password
      })
    }
  }

  return (
    <>
      <div className='container-sm'>
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
        <div>
          {errorUsername.status ?
            <>
              {errorUsername.message.map(message => (
                <>
                  <p style={{color: '#8B0000'}}>Username { message }</p>
                </>
              ))}
            </>
            : null}
          {errorEmail.status ?
            <>
              {errorEmail.message.map(message => (
                <>
                  <p style={{color: '#8B0000'}}>Email { message }</p>
                </>
              ))}
            </>
            : null}
          {errorPassword.status ?
            <>
              {errorPassword.message.map(message => (
                <>
                  <p style={{color: '#8B0000'}}>Password { message }</p>
                </>
              ))}
            </>
            : null}
        </div>
      </div>
      <div className='container-sm'>
        <div className='top-space'></div>
        <p>Have an account? <Link className='sign-link' to='/'>Sign in</Link></p>
      </div>
    </>
  )
}