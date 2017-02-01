import { Router } from 'express';
import * as PostController from '../controllers/postController';

const express = require('express')
  , router = express.Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get a single post
router.route('/post/:postId').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a Post
router.route('/posts/:postId').get(PostController.deletePost);

module.exports = router;
