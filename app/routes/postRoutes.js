import { Router } from 'express';
import * as PostController from '../controllers/postController';

var express = require('express')
  , router = express.Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a Post
router.route('/posts/:postId').get(PostController.deletePost);

module.exports = router;
