import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { allUserPhotos } from '../../../services/user'

import './UserPhotoPop.css'

export default function UserPhotoPop(props) {
  const { photo, currentUser, userComments, show, hide } = props

  return (
    <>
      <Modal
        show={show}
        onHide={hide}
        centered
        dialogClassName='modal-90w'
        aria-labelledby={`user-modal-${photo[0].id}`}
      >
        <Modal.Body>

          <div className='d-flex flex-row justify-content-start'>
            {/* image */}
            <div className='userpop-img-container'>
              <img
                className='userpop-img'
                src={photo[0].url}
                alt={photo[0].content}
              />
            </div>

            {/* column for user info */}
            <div className='flex-column'>

              {/* top of column/user img and username */}
              <div className='d-flex flex-row flex-nowrap'>
                <div className='userpop-user-img-container userpop-user-left-margin-20px'>
                  <img className='userpop-user-img' src={currentUser.user_self_img}/>
                </div>
                <div className='userpop-user-text font-weight-bold'>
                  <p>{currentUser.username}</p>
                </div>
              </div>

              {/* divider */}
              <div className='dropdown-divider'></div>

              {/* username and content of photo */}
              <div className='d-flex flex-row flex-nowrap'>
                <div className='userpop-user-img-container userpop-user-left-margin-20px'>
                  <img className='userpop-user-img' src={currentUser.user_self_img}/>
                </div>
                <div className='userpop-user-text font-weight-bold'>
                  <p>{currentUser.username}</p>
                </div>
                <div className='userpop-user-text'>
                  <p>{photo[0].content}</p>
                </div>
              </div>

              {userComments.map(action => (
                <>
                  <div className='d-flex flex-row flex-nowrap'>
                    <div className='userpop-user-img-container userpop-user-left-margin-20px'>
                      <img className='userpop-user-img' src='https://i.imgur.com/PnUuUtU.jpg'/>
                    </div>
                    <div className='userpop-user-text font-weight-bold'>
                      <p>{action[1][0].username}</p>
                    </div>
                    <div className='userpop-user-text'>
                      <p>{action[0].content}</p>
                    </div>
                  </div>
                </>
              ))}
              
            </div>
            
          </div>
{/*       <div className='d-flex flex-row'>
            <img id={`${photo[0].id}`} alt={`${photo[0].content}`} className='userpop-img' src={photo[0].url} />
            <div className='userpop-container'>

              <div className='userpop-container-user'>
                <div className='d-flex flex-row userpop-user-title'>
                  <div className='userpop-user-img-container'>
                    <img className='userpop-user-img' src={currentUser.user_self_img}/>
                  </div>
                  <div className='userpop-user-text'>
                    {currentUser.username}
                  </div>
                </div>

                <div className='dropdown-divider'></div>

                
                  <div className='d-flex flex-row userpop-user-title'>
                    <div className='userpop-user-img-container'>
                      <img className='userpop-user-img' src={currentUser.user_self_img}/>
                    </div>
                    <div className='userpop-user-text'>
                      <p>{currentUser.username}</p>
                    </div>
                    <div className='userpop-user-text font-weight-lighter'>
                      <p>{photo[0].content}</p>
                    </div>

                    {userComments.map(action => (
                      <>
                        <div className='d-flex flex-row userpop-user-title'>
                          <div className='userpop-user-img-container'>
                            <img className='userpop-user-img' src='https://i.imgur.com/PnUuUtU.jpg' />
                          </div>
                          <div className='userpop-user-text'>
                            <p>{action[1].username}</p>
                          </div>
                          <div className='userpop-user-text font-weight-lighter'>
                            {action[0].content}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>

              </div>
            </div>
            </div>
             */}
        </Modal.Body>
      </Modal>
    </>
  )
}