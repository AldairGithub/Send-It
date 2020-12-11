import React from 'react'
import Button from 'react-bootstrap/Button'

export default function UserFollowButton(props) {
  const { relationship, currentUser, handleFollow } = props


  const handleButton = () => {
    if (relationship === null) {
      return
    } else if (relationship[1] === undefined) {
      return (
        <>
          <div className='ml-auto'>
            <Button onClick={() => { handleFollow(false, currentUser.id, relationship[0].id, 'Pending', currentUser.id) }} variant='info'>Follow</Button>
          </div>
        </>
      )
    } else {
      if (relationship[1].user_one_id === currentUser.id) {
        if (relationship[1].status === 'Pending') {
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(relationship[1].id, null, null, false, null) }} variant='light'>Following</Button>
              </div>
            </>
          )
        } else if (relationship[1].status === 'Denied') {
          if (relationship[1].last_user_action_id === currentUser.id) {
            return (
              <>
                <div className='ml-auto'>
                  <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Accepted', currentUser.id) }} variant='info'>Follow</Button>
                </div>
              </>
            )
          } else {
            return (
              <>
                <div className='ml-auto'>
                  <Button onClick={() => { handleFollow(relationship[1].id, null, null, false, null) }} variant='danger'>Delete</Button>
                </div>
              </>
            )
          }
        } else if (relationship[1].status === 'Accepted') {
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Denied', currentUser.id) }} variant='light'>Following</Button>
              </div>
            </>
          )
        }
      } else if (relationship[1].user_two_id === currentUser.id) {
        if (relationship[1].status === 'Pending') {
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Accepted', currentUser.id) }} variant='info'>Follow</Button>
              </div>
            </>
          )
        } else if (relationship[1].status === 'Denied') {
          if (relationship[1].last_user_action_id === currentUser.id) {
            return (
              <>
                <div className='ml-auto'>
                  <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Accepted', currentUser.id) }} variant='info'>Follow</Button>
                </div>
              </>
            )
          } else {
            return (
              <>
                <div className='ml-auto'>
                  <Button onClick={() => { handleFollow(relationship[1].id, null, null, false, null) }} variant='danger'>Delete</Button>
                </div>
              </>
            )
          }
        } else if (relationship[1].status === 'Accepted') { 
          return (
            <>
              <div className='ml-auto'>
                <Button onClick={() => { handleFollow(relationship[1].id, relationship[1].user_one_id, relationship[1].user_two_id, 'Denied', currentUser.id) }} variant='light'>Following</Button>
              </div>
            </>
          )
        }
      }
    }

  }

  // if (user[1].user_one_id === currentUser.id) {
  //   if (user[1].status === 'Pending') {
  //     // current user followed user, but user hasnt followed back
      // return (
      //   <>
      //     <div className='ml-auto'>
      //       <Button onClick={() => { handleFollow(user[1].id, null, null, false, null, data) }} variant='light'>Following</Button>
      //     </div>
      //   </>
      // )
  //   } else if (user[1].status === 'Denied') {
  //     if (user[1].last_user_action_id === currentUser.id) {
  //       // cu followed user, user followed back, cu unfollowed user, user still follows cu
        // return (
        //   <>
        //     <div className='ml-auto'>
        //       <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Accepted', currentUser.id, data) }} variant='info'>Follow</Button>
        //     </div>
        //   </>
        // )
  //     } else {
  //       // cu followed user, user followed back, user unfollowed cu, cu still follows user
        // return (
        //   <>
        //     <div className='ml-auto'>
        //       <Button onClick={() => { handleFollow(user[1].id, null, null, false, null, data) }} variant='danger'>Delete</Button>
        //     </div>
        //   </>
        // )
  //     }
  //   } else if (user[1].status === 'Accepted') {
      // return (
      //   <>
      //     <div className='ml-auto'>
      //       <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Denied', currentUser.id, data) }} variant='light'>Following</Button>
      //     </div>
      //   </>
      // )
  //   }

  // } else if (user[1].user_two_id === currentUser.id) {
  //   if (user[1].status === 'Pending') {
      // return (
      //   <>
      //     <div className='ml-auto'>
      //       <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Accepted', currentUser.id, data) }} variant='info'>Follow</Button>
      //     </div>
      //   </>
      // )
    // } else if (user[1].status === 'Denied') {
    //   if (user[1].last_user_action_id === currentUser.id) {
    //     // user followed cu, cu followed back, cu unfollowed user, user still follows cu
        // return (
        //   <>
        //     <div className='ml-auto'>
        //       <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Accepted', currentUser.id, data) }} variant='info'>Follow</Button>
        //     </div>
        //   </>
        // )
  //     } else {
  //       // user followed cu, cu followed back, user unfollowed cu, cu still follows user
        // return (
        //   <>
        //     <div className='ml-auto'>
        //       <Button onClick={() => { handleFollow(user[1].id, null, null, false, null, data) }} variant='danger'>Delete</Button>
        //     </div>
        //   </>
        // )
  //     }
  //   } else if (user[1].status === 'Accepted') {
      // return (
      //   <>
      //     <div className='ml-auto'>
      //       <Button onClick={() => { handleFollow(user[1].id, user[1].user_one_id, user[1].user_two_id, 'Denied', currentUser.id, data) }} variant='light'>Following</Button>
      //     </div>
      //   </>
      // )
  //   }
  // } else {
    // return (
    //   <>
    //     <div className='ml-auto'>
    //       <Button onClick={() => { handleFollow(false, currentUser.id, user[0].id, 'Pending', currentUser.id, data) }} variant='info'>Follow</Button>
    //     </div>
    //   </>
    // )
  // }

  return (
    <>
      {handleButton()}
    </>
  )

}
