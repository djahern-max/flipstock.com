import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { GetUser } from '../apicalls/users'

function ProtectedRoute({ children }) {
  const [user, setUser] = React.useState(null)
  const navigate = useNavigate()
  const getUser = async () => {
    try {
      const response = await GetUser()
      if (response.success) {
        toast.success(response.message)
        setUser(response.data)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser()
    } else {
      navigate('/login')
    }
  }, [])
  return (
    user && (
      <div>
        {user.name}
        {user.email}
        {children}
      </div>
    )
  )
}

export default ProtectedRoute
