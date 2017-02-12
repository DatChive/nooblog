import React from 'react';
import {Link} from 'react-router';
import HeaderStore from '../stores/HeaderStore';
import HeaderActions from '../actions/HeaderActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = HeaderStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    HeaderStore.listen(this.onChange);
    let socket = io.connect();

    socket.on('connections', (data) => {
      HeaderActions.updateConnections(data);
    });
  }
  componentWillUnmount() {
    HeaderStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <ul className='nav navbar-nav col-md-3'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/new'>New Post</Link></li>
        </ul>
        <div className='navbar-header col-md-5'>
          <Link to='/' className='navbar-brand'>
            <p>Welcome to Nooblog | [{this.state.connections}] User(s) Online</p>
          </Link>
        </div>
        <div className="nav navbar-nav col-md-4">
          <li><Link to='/'>Login</Link></li>
          <li><Link to='/'>Register</Link></li>
        </div>
      </nav>
    );
  }
}

export default Header;