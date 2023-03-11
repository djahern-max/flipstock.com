import React from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users'
import Button from '../../components/Button'

function Register() {
  const navigate = useNavigate()
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  const register = async () => {
    try {
      const response = await RegisterUser(user)
      if (response.success) {
        toast.success(response.message)
        navigate('/login')
      } else {
        toast.error(response.message)
      }
      console.log(response)
      alert(response.messsage)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center h-screen items-center bg-primary'>
      <div className='bg-white p-5 w-[450px]'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl font-bold text-center text-primary uppercase'>
            FLIPSTOCK.com - Register
          </h1>
          <input
            type='text'
            placeholder='Enter your name'
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <input
            type='email'
            placeholder='Enter your email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type='password'
            placeholder='Enter your password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button
            title='Register'
            onClick={register}
            disabled={
              user.name.length < 3 ||
              user.email.length < 3 ||
              user.password.length < 3
            }
          />
          <Link to='/login' className='text-center text-primary underline'>
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
