import { Router } from 'express';
import * as PostController from '../controllers/postController';

var express = require('express')
  , router = express.Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// TODO: Get read/delete post
// router.route('/posts/:cuid').get(PostController.getPost);
//
// // Delete a post by cuid
// router.route('/posts/:cuid').delete(PostController.deletePost);

module.exports = router;
