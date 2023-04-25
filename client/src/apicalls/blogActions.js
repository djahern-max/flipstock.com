import { axiosInstance } from '.'

// Like a blog
export const LikeBlog = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/blog-actions/like-blog',
      payload
    )
    return response.data
  } catch (error) {
    return error.response.data
  }
}

// Unlike a blog
export const UnlikeBlog = async (payload) => {
  try {
    const response = await axiosInstance.post(
      '/api/blog-actions/unlike-blog',
      payload
    )
    return response.data
  } catch (error) {
    return error.response.data
  }
}

// Get all likes of a blog
export const GetAllLikesOfBlog = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/blog-actions/get-all-likes-of-blog/${id}`
    )
    return response.data
  } catch (error) {
    return error.response.data
  }
}
