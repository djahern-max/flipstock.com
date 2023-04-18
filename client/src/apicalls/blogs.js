import { axiosInstance } from '.'

// Add a new blog
export const AddNewBlog = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/blogs/add-blog', payload)
    return response.data
  } catch (error) {
    throw error || error.response.data
  }
}

// Get all blogs
export const GetAllBlogs = async () => {
  try {
    const response = await axiosInstance.get('/api/blogs/get-all-blogs')
    return response.data
  } catch (error) {
    throw error || error.response.data
  }
}

// Get blog by id
export const GetBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/blogs/get-blog-by-id/${id}`)
    return response.data
  } catch (error) {
    throw error || error.response.data
  }
}
