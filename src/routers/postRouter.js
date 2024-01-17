const express = require('express');
const {
  handleCreatePost,
  handleGetAllPosts,
  handleGetSinglePost,
  handleGetPostsByEmail,
} = require('../controllers/postController');
const postRouter = express.Router();

postRouter.post('/', handleCreatePost);
postRouter.get('/', handleGetAllPosts);
postRouter.get('/:slug', handleGetSinglePost);
postRouter.get('/email/:email', handleGetPostsByEmail);

module.exports = postRouter;
