import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import NewPost from './components/NewPost';
import ViewPost from './components/ViewPost';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/new' component={NewPost} />
    <Route path='/view/:postId' component={ViewPost} />
  </Route>
);