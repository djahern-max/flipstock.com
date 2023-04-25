import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import { toast } from 'react-hot-toast'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { DeleteBlog, GetBlogById } from '../../apicalls/blogs'
import ReactHtmlParser from 'react-html-parser'
import draftToHtml from 'draftjs-to-html'
import moment from 'moment'
import {
  LikeBlog,
  GetAllLikesOfBlog,
  UnlikeBlog,
} from '../../apicalls/blogActions'

function BlogDescription() {
  const [isAlreadyLiked, setIsAlreadyLiked] = useState(false)
  const [likes = [], setLikes = []] = useState([])
  const [blog, setBlog] = useState(null)
  const { currentUser } = useSelector((state) => state.usersReducer)
  // console.log(currentUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const deleteBlog = async () => {
    try {
      dispatch(ShowLoading())
      const response = await DeleteBlog(id)
      if (response.success) {
        toast.success(response.message)
        navigate('/')
      } else {
        toast.error(response.message)
      }
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
      toast.error(error.message)
    }
  }

  const getData = async () => {
    try {
      dispatch(ShowLoading())
      const response = await GetBlogById(id)
      const likesResponse = await GetAllLikesOfBlog(id)
      if (likesResponse.success) {
        setLikes(likesResponse.data)
        const isLiked = likesResponse.data.find(
          (like) => like.user._id === currentUser._id
        )
        setIsAlreadyLiked(isLiked)
      }

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

  const likeOrUnlike = async () => {
    try {
      dispatch(ShowLoading())
      let response = null
      if (isAlreadyLiked) {
        response = await UnlikeBlog({
          blog: blog?._id,
          user: currentUser._id,
        })
      } else {
        response = await LikeBlog({
          blog: blog?._id,
          user: currentUser._id,
        })
      }
      if (response.success) {
        getData()
        setIsAlreadyLiked(!isAlreadyLiked)
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
    blog && (
      ///***NEEDS UPDATE  currentUser?._id === blog?.user?._id &&  ******///
      // EDIT AND DELETE WEREN'T WORKING WITH THE ABOVE STATEMENT//
      <div className='p-2 flex flex-col gap-5'>
        {
          <div className='flex justify-end gap-5'>
            <Button
              onClick={() => deleteBlog()}
              title='Delete'
              variant='primary-outlined'
            />
            <Button
              onClick={() => navigate(`/edit-blog/${blog?._id}`)}
              title='Edit'
            />
          </div>
        }
        <h1 className='text-2xl font-bold text-primary'>{blog?.title}</h1>
        <hr />
        <h1>{blog?.description}</h1>
        <div>{ReactHtmlParser(draftToHtml(JSON.parse(blog?.content)))}</div>
        <hr />
        <div className='flex justify-between items-center'>
          <div>
            {/* <h1>Posted By: {blog.user.name}</h1> */}
            <h1>Posted: {moment(blog.createdAt).fromNow()}</h1>
          </div>
          <div className='flex gap-5 items-center'>
            <div
              className='flex gap-1 items-center cursor-pointer'
              onClick={likeOrUnlike}
            >
              <i
                className='ri-heart-fill'
                style={{ color: isAlreadyLiked ? 'red' : 'gray' }}
              ></i>
              <span>{blog.likesCount}</span>
            </div>
            <div className='flex gap-1 items-center cursor-pointer'>
              <i class='ri-chat-1-line'></i>
              <span>{blog.commentsCount}</span>
            </div>
            <div className='flex gap-1 items-center cursor-pointer'>
              <i class='ri-share-forward-line'></i>
              <span>{blog.sharesCount}</span>
            </div>
          </div>
        </div>

        <hr />
      </div>
    )
  )
}

{
  /* <h1>{blog?.content}</h1> */
}

export default BlogDescription
