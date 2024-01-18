const slugify = require('slugify');
const Post = require('../models/postModel');
const Category = require('../models/categoryModel');

const handleCreatePost = async (req, res, next) => {
  try {
    const { title, content, image, category, author } = req.body;

    const postExists = await Post.exists({ title });

    if (postExists)
      return res.status(409).json({
        success: false,
        message: `Post with this title already exist.`,
      });

    const post = await Post.create({
      title,
      slug: slugify(title),
      content,
      image,
      category,
      author,
    });

    return res.status(200).json({
      success: true,
      message: `Post created successfully`,
      post,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetAllPosts = async (req, res, next) => {
  try {
    let sort = { createdAt: -1 };
    let filter = {};

    const categoryName = req.query.category;

    if (categoryName) {
      const category = await Category.findOne({ slug: categoryName });

      filter = { category: category._id };
    }

    const sortQuery = req.query.sort;

    if (sortQuery === 'latest') sort = { createdAt: -1 };

    if (sortQuery === 'oldest') sort = { createdAt: 1 };

    const posts = await Post.find(filter).sort(sort).populate('category');

    if (!posts)
      return res.status(409).json({
        success: false,
        message: `Posts not found.`,
      });

    return res.status(200).json({
      success: true,
      message: `All Posts fetched successfully`,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetSinglePost = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug }).populate('category');

    if (!post)
      return res.status(409).json({
        success: false,
        message: `Post not found.`,
      });

    return res.status(200).json({
      success: true,
      message: `Post fetched successfully`,
      post,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetPostsByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;

    const posts = await Post.find({ 'author.email': email }).populate(
      'category'
    );

    if (!posts)
      return res.status(409).json({
        success: false,
        message: `Posts not found.`,
      });

    return res.status(200).json({
      success: true,
      message: `Posts fetched successfully`,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeletePostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Post.findOneAndDelete({ _id: id });

    if (!result)
      return res.status(409).json({
        success: false,
        message: `Could not delete the post`,
      });

    return res.status(200).json({
      success: true,
      message: `Post deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreatePost,
  handleGetAllPosts,
  handleGetSinglePost,
  handleGetPostsByEmail,
  handleDeletePostById,
};
