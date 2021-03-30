import React, { useState } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import SuggestedFollows from '../home/suggested_follows/SuggestedFollows'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './SearchBar.css'

export default function SearchBar(props) {
  const { currentUser, setCurrentUser, allUsers } = props

  const [search, setSearch] = useState({
    username: ''
  })
  const [list, setList] = useState([])

  const filter = (str) => {
    if (str.length === 0) {
      const noList = []
      setList(noList)
    } else {
      const filtered = allUsers.filter(ele => {
        return ele.username.toLowerCase().includes(str)
      })
      setList(filtered)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearch({
      ...search,
      [name]: value
    })
    filter(value)
  }

  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        allUsers={allUsers}
      />
      <form className='searchbar-form form-inline d-flex justify-content-center'>
        <input
          name='username'
          value={search.username}
          type='search'
          placeholder='Search'
          aria-label='Search'
          onChange={handleChange}
          className='form-control mr-sm-2'
          style={{width: '350px'}}
        />
        <div className='searchbar-dropdown-top'>
          <div className='searchbar-menu-container'>
            {list.length > 0 && 
              <div className='searchbar-menu-list'>
                {list.map(str => (
                  <>
                    <Link to={`/account/${str.username}`}>
                      <div className='search-container d-flex flex-row flex-wrap'>
                        <div className='search-img-container'>
                          {str.user_self_img === null ?
                            <>
                              <FontAwesomeIcon
                                icon={faUser}
                                size='2x'
                                color='gray'
                                style={{paddingLeft: '10px'}}
                              />
                            </>
                            :
                            <>
                              <img alt={`user avatar of ${str.username}`} className='search-img-avatar' src={str.user_self_img} />
                            </>
                          }
                        </div>
                        <div className='search-text-container d-flex flex-column justify-content-start align-items-stretch align-content-center'>
                          <p className='search-text-username'>{str.username}</p>
                          <p className='search-text-name'>{str.name}</p>
                        </div>
                      </div>
                    </Link>
                  </>
                ))}
              </div>
            }
          </div>
        </div>
        <div className='search-suggest-list-container'>
          <SuggestedFollows currentUser={currentUser} allUsers={allUsers}/>
        </div>
      </form>
      <Footer
        currentUser={currentUser}
      />
    </>
  )
}