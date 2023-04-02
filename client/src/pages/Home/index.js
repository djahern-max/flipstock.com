import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const { currentUser } = useSelector((state) => state.userReducer)
  return (
    <div>
      <h1 className='text-primary uppercase text-2xl font-bold'>
        Welcome {currentUser.name} !
      </h1>
    </div>
  )
}

export default Home
