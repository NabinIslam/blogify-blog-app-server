const slugify = require('slugify');
const Post = require('../models/postModel');

const handleCreatePost = async (req, res, next) => {
  try {
    const { title, content, image, author } = req.body;

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

    const sortQuery = req.query.sort;

    if (sortQuery === 'latest') sort = { createdAt: -1 };

    if (sortQuery === 'oldest') sort = { createdAt: 1 };

    const posts = await Post.find({}).sort(sort);

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

module.exports = { handleCreatePost, handleGetAllPosts };
