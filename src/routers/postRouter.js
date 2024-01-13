const express = require('express');
const {
  handleCreatePost,
  handleGetAllPosts,
} = require('../controllers/postController');
const postRouter = express.Router();

postRouter.post('/', handleCreatePost);
postRouter.get('/', handleGetAllPosts);

module.exports = postRouter;
