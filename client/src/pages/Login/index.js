import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../apicalls/users'
import Button from '../../components/Button'

function Login() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  })

  const login = async () => {
    try {
      const response = await LoginUser(user)
      alert(response.messsage)
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <div className='flex justify-center h-screen items-center bg-primary'>
      <div className='bg-white p-5 w-[450px]'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl font-bold text-center text-primary uppercase'>
            FLIPSTOCK.com - Login
          </h1>

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
            title='Login'
            onClick={login}
            disabled={user.email.length < 3 || user.password.length < 3}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
