const Like = require('../models/likesModel')
const Share = require('../models/sharesModel')
const Comment = require('../models/commentsModel')
const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const Blog = require('../models/blogsModel')
// const Notification = require('../models/notificationsModel')

// like a blog
router.post('/like-blog', authMiddleware, async (req, res) => {
  try {
    // add new like to likes collection
    const newLike = new Like(req.body)
    await newLike.save()

    // increment likes count in blog document
    await Blog.findByIdAndUpdate(req.body.blog, {
      $inc: { likesCount: 1 },
    })

    // add notification to notifications collection
    const newNotification = new Notification(req.body.notificationPayload)
    await newNotification.save()

    res.send({
      message: 'Blog liked successfully',
      data: newLike,
      success: true,
    })
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
    })
  }
})

module.exports = router
