const express = require('express');
const {
  handleCreatePost,
  handleGetAllPosts,
  handleGetSinglePost,
} = require('../controllers/postController');
const postRouter = express.Router();

postRouter.post('/', handleCreatePost);
postRouter.get('/', handleGetAllPosts);
postRouter.get('/:slug', handleGetSinglePost);

module.exports = postRouter;
