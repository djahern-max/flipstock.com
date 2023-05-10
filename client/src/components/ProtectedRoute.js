import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetAllNotifications } from '../apicalls/notifications'
import { GetUser } from '../apicalls/users'
import { HideLoading, ShowLoading } from '../redux/loadersSlice'
import { SetCurrentUser, SetNotifications } from '../redux/usersSlice'

function ProtectedRoute({ children }) {
  const { currentUser, notifications } = useSelector(
    (state) => state.usersReducer
  )
  const dispatch = useDispatch()
  // const [user, setUser] = React.useState(null)

  const navigate = useNavigate()
  const getUser = async () => {
    try {
      dispatch(ShowLoading())
      const response = await GetUser()
      if (response.success) {
        dispatch(SetCurrentUser(response.data))
        toast.success(response.message)
        const notificationsResponse = await GetAllNotifications()
        if (notificationsResponse.success) {
          const notificationsTemp = {
            read: notificationsResponse.data.filter(
              (notification) => notification.read
            ),
            unread: notificationsResponse.data.filter(
              (notification) => !notification.read
            ),
          }
          dispatch(SetNotifications(notificationsTemp))
          // dispatch(SetUnreadCount(notificationsTemp.unread.length))
        }
      } else {
        localStorage.removeItem('token')
        navigate('/login')
        toast.error(response.message)
      }
      dispatch(HideLoading())
    } catch (error) {
      localStorage.removeItem('token')
      navigate('/login')
      dispatch(HideLoading())
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
    currentUser && (
      <div className='p-5'>
        <div className='bg-primary w-full p-5 justify-between flex rounded items-center'>
          <h1
            className='text-white text-2xl font-bold uppercase cursor-pointer'
            onClick={() => navigate('/')}
          >
            Flipstock.com
          </h1>

          <div className='bg-white rounded p-2 flex gap-2 items-center font-semibold text-primary'>
            <h1
              className='underline uppercase text-sm cursor-pointer'
              onClick={() => navigate('/profile')}
            >
              {currentUser.name}
            </h1>
            <div
              className='relative flex cursor-pointer'
              onClick={() => navigate('/notifications')}
            >
              <i className='ri-notification-line cursor-pointer'></i>

              <h1 className='p-2 h-5 w-5 bg-red-500 text-white  rounded-full text-[10px] flex items-center justify-center  -ml-1'>
                {notifications.unread.length}
              </h1>
            </div>
            <i
              className='ri-logout-circle-r-line ml-5 cursor-pointer'
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/login')
              }}
            ></i>
          </div>
        </div>

        <div className='mt-5 overflow-scroll h-[85vh]'>{children}</div>
      </div>
    )
  )
}
export default ProtectedRoute
