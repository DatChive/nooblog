import Post from '../../models/post';

/**
 * POST /api/posts
 * Add a post. Check for duplicate titles.
 * @param req
 * @param res
 * @returns void
*/
export function addPost(req, res) {
  var title = req.body.title;
  var body = req.body.body;

  Post.findOne({title: title}, function (err, post) {
    if (post) {
      return res.status(409).send({message: post.title + ' is already in the database.'});
    } else {
      var newPost = Post({
        title: title,
        body: body
      });
      newPost.save(function (err) {
        if (err) {
          return next(err);
        }
        res.send('Record Added');
      });
    }
  });
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
      return next(err);
    }
    else {
      return res.send(posts)
    }
  })
}
