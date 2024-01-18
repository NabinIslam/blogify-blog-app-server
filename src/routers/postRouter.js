const express = require('express');
const {
  handleCreatePost,
  handleGetAllPosts,
  handleGetSinglePost,
  handleGetPostsByEmail,
  handleDeletePostById,
  handleGetPostById,
} = require('../controllers/postController');
const postRouter = express.Router();

postRouter.post('/', handleCreatePost);
postRouter.get('/', handleGetAllPosts);
postRouter.get('/:id', handleGetPostById);
postRouter.get('/:slug', handleGetSinglePost);
postRouter.get('/email/:email', handleGetPostsByEmail);
postRouter.delete('/:id', handleDeletePostById);

module.exports = postRouter;
