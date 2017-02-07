import React from 'react';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {Link} from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getPosts();
  }
  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  handleDelete(postId) {
    if(postId) {
      HomeActions.deletePost(postId);
			var posts = this.state.posts.filter(function(post) { return post.title != postId });
			this.setState({ posts: posts });
    }
  }
  render() {
    var postNodes = this.state.posts.map((post, index) => {
      return (
        <div key={post.title} className='list-group-item animated fadeIn col-md-6'>
          <div className='media'>
            <span className='position pull-left' />
            <div>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
              <button onClick={this.handleDelete.bind(this, post.title)} className="btn btn-warning">Delete</button>
              <button className="btn btn-info">Edit</button>
              <Link to={'/view/' + post.title}><button className="btn btn-primary">View</button></Link>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='jumbotron'>
          <h1>Blog Posts</h1>
        </div>
        <div className='list-group'>
          {postNodes}
        </div>
      </div>
    );
  }
}

export default Home;
