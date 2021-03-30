import React, { useEffect, useState} from 'react'

import { allUserRelationships } from '../../../services/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import './SuggestedFollows.css'

export default function SuggestedFollows(props) {
  const { currentUser, allUsers } = props

  const [list, setList] = useState([])

  useEffect(() => {
    if (currentUser !== null) {
      getSuggestedFollows(currentUser.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const getSuggestedFollows = async (id) => {

    const getRelationship = async (user) => {
      let str = await allUserRelationships(user.id)
      return [user, str]
    }

    const filteredUsers = allUsers.filter(user => user.id !== id)
    const suggested = await Promise.all(filteredUsers.map(async (user) =>
      getRelationship(user)
    ))

    // need to filter list of most followed users based on who hasnt the current user followed yet
    const topUserWithFollows = suggested.filter(user => user[1].length >= 5)

    const shouldFollow = (arr) => {
      const list = arr.map(user => [
        user[0],
        user[1].filter(i => (i.user_one_id === currentUser.id || i.user_two_id === currentUser.id))
      ])
      return list.filter(user => user[1].length === 0 )
    }

    setList(shouldFollow(topUserWithFollows))

  }
  
  return (
    <>
      <div className='suggested-list-container'>
        {list.length > 0 &&
          <>
            <h4 style={{ color: 'gray', fontSize: '18px' }}>Suggested People To Follow</h4>
              <div>
                {list.map((ele, index) => (
                <>
                  <div key={index} className='suggested-img-container'>
                    <div className='suggested-avatar-img-container'>
                      {ele[0].user_self_img === null ?
                        <>
                          <FontAwesomeIcon
                            icon={faUserCircle}
                            size='2x'
                          />
                        </>
                        :
                        <>
                            <img alt={`user avatar of ${ele[0].username}`} className='suggested-avatar-img' src={ ele[0].user_self_img}/>
                        </>
                      }
                    </div>
                    <div>
                      <Link className='suggested-text' to={`/account/${ele[0].username}`}><p>{ele[0].username}</p></Link>
                    </div>
                  </div>
                </>
                ))}
              </div>
          </>
        }
      </div>
    </>
  )
}