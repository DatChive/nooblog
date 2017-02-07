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

// Update a Post's body
router.route('/posts/:postId').put(PostController.updatePost);


module.exports = router;
