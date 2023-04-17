import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { toast } from 'react-hot-toast'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'

function Home() {
  const { currentUser } = useSelector((state) => state.usersReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      dispatch(ShowLoading())
    } catch (error) {
      dispatch(HideLoading())
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-primary uppercase text-2xl font-bold'>
          Welcome {currentUser.name}!
        </h1>
      </div>

      <div className='grid lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-5 sm:grid-cols-1 xs:grid-cols-1'></div>
    </div>
  )
}

export default Home
