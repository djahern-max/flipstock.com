import React, { useState } from 'react'
import Button from '../../components/Button'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
// import { ShareBlog } from "../../apicalls/blogActions";
import { SearchUsers } from '../../apicalls/users'
// import Button from '../../components/Button'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'

function Share({ blog, setShowShare, setShowComments, getData }) {
  const [users = [], setUsers = []] = useState([])
  const [searchText = '', setSearchText = ''] = useState('')
  const [selectedUsers = [], setSelectedUsers = []] = useState([])
  const { currentUser, socket } = useSelector((state) => state.usersReducer)
  const dispatch = useDispatch()
  const getUsers = async () => {
    try {
      dispatch(ShowLoading())
      const response = await SearchUsers(searchText)
      if (response.success) {
        setUsers(response.data)
      } else {
        toast.error(response.message)
      }
      dispatch(HideLoading())
    } catch (error) {
      toast.error(error.message)
      dispatch(HideLoading())
    }
  }
  return (
    <div className='border p-5'>
      <h1>
        Share: <span className='font-bold'>{blog.title}</span>
      </h1>
      <div className='flex gap-5 mt-5 items-center'>
        <input
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='w-1/2'
          placeholder='Search for people'
        />
        <Button title='Search' onClick={getUsers} />
      </div>
    </div>
  )
}

export default Share
