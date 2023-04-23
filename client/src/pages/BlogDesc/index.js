import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import { toast } from 'react-hot-toast'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { GetBlogById } from '../../apicalls/blogs'
// import ReactHtmlParser from 'react-html-parser'
import draftToHtml from 'draftjs-to-html'

function BlogDescription() {
  const [blog, setBlog] = useState(null)
  const { currentUser } = useSelector((state) => state.usersReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const getData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await GetBlogById(id)
      if (response.success) {
        setBlog(response.data)
      } else {
        toast.error(response.message)
      }
      dispatch(HideLoading())
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
      <h1 className='text-2xl font-bold text-primary'>{blog?.title}</h1>
      <hr />
      <h1>{blog?.description}</h1>
      {/* <div>{ReactHtmlParser(draftToHtml(JSON.parse(blog?.content)))}</div> */}
      {/* <h1>{blog?.content}</h1> */}

      <hr />
    </div>
  )
}

export default BlogDescription
