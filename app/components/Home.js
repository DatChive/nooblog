import React from 'react';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';

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
  render() {
    var postNodes = this.state.posts.map((post, index) => {
      return (
        <div key={post.title} className='list-group-item animated fadeIn'>
          <div className='media'>
            <span className='position pull-left' />
            <div className='pull-left thumb-lg'>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
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
