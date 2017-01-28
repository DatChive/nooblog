import React from 'react';
import FooterStore from '../stores/FooterStore'

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    FooterStore.listen(this.onChange);
  }
  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
              <h1>Footer. TODO: Find something useful to put here.</h1>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;