import Post from '../../models/post';

/**
 * POST /api/posts
 * Add a post. Check for duplicate titles.
 * @param req
 * @param res
 * @returns void
*/
export function addPost(req, res) {
  const title = req.body.title;

  Post.findOne({title: title}, function (err, post) {
    if (post) {
      res.status(409).send({ message: post.title + ' is already in the database.' })
    } else {
      let newPost = Post(req.body);
      newPost.save(function (err) {
        if (err) {
          res.send(err)
        } else {
          res.json({ message: 'Post Added', newPost })
				}
      })
    }
  })
}

/**
 * GET /api/posts
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
	Post.find().exec(function (err, posts) {
		if (err) {
			res.send(err)
		}
		else {
			res.send(posts)
		}
	})
}

/**
 * GET /api/post/:postId
 * Get single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
	Post.findOne({ title: req.params.postId }).exec(function (err, post) {
		if (!post) {
			res.status(409).send({ message: 'Post Not Found' })
		}
		if (err) {
			res.send(err)
		}
		else {
			return res.json({ post: post })
		}
	})
}

/**
 * GET /api/posts/:postId
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
	Post.findOne({ title: req.params.postId }).exec((err, post) => {
		if (!post) {
			res.status(409).send({ message: 'Post Not Found' })
		}
		if (err) {
			res.status(500).send(err)
		}
		else {
			post.remove(() => {
				res.status(200).end()
			})
		}
	})
}

/**
 * PUT /api/posts/:postId
 * Update a post's body
 * @param req
 * @param res
 * @returns void
 */
export function updatePost(req, res) {
	if(req.body.body != null) {
	Post.findOne({ title: req.params.postId }).exec((err, post) => {
		if(err){
			res.status(500).send(err)
		}

		post.body = req.body.body
		post.save(function (err, updatedPost) {
			if (err) return handleError(err);
			res.send(updatedPost);
		});
	})
	} else {
		res.status(409).send({ message: 'Please provide body text' })
	}
}
