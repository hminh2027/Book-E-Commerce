const Blog = require("../models/blog.model")
const Comment = require("../models/comment.model")
const Tag = require("../models/tag.model")

const {cloudinary} = require('../utils/cloudinary')

module.exports.getAllBlogs = async (req, res) => {
    let rs

    const { tagID, search } = req.query

   if (tagID) rs = await Blog.getByTagId(tagID)  
   else if (search) rs = await Blog.getByTitle(search)  
   else rs = await Blog.getAll()

   const rs2 = await Tag.getAll()

    // Pagination
    const page = req.query.page || 1
    const limit = 2
    const pageCount = Math.ceil(rs.data.length / limit)
    blogs = rs.data.slice(page * limit - limit, page * limit)

    return res.render('blog', {
        blogs,
        tags: rs2.data,
        pageCount
    })
}

module.exports.getBlogById = async (req, res) => {
    const {id} = req.params

    const rs1 = await Blog.getById(id)
    const rs2 = await Tag.getAll()
    const rs3 = await Comment.getById(id)
    const rs4 = await Tag.getByBlogId(id)

    return res.render('blog-detail', {
        blog: rs1.data,
        tags: rs2.data,
        comments: rs3.data,
        blogTags: rs4.data
    })
}