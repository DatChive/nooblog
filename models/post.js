var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  body: String,
});

module.exports = mongoose.model('Post', postSchema);