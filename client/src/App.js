import React, { useState, useEffect } from 'react';
import './App.css';

import { verifyUser } from './services/auth'

import Main from './component/Main'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    handleVerify()
  }, [])

  const handleVerify = async () => {
    const userData = await verifyUser()
    setCurrentUser(userData)
  }

  return (
    <div>
      <Main
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

