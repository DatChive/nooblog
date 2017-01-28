import React from 'react';
import NewPostStore from '../stores/NewPostStore';
import NewPostActions from '../actions/NewPostActions';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = NewPostStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    NewPostStore.listen(this.onChange);
  }
  componentWillUnmount() {
    NewPostStore.unlisten(this.onChange);
  }
  onChange(state) {
    this.setState(state);
  }
  handleSubmit(event) {
    event.preventDefault();
    var title = this.state.title.trim();
    var body = this.state.body;

    if (!title) {
      NewPostActions.invalidTitle();
      this.refs.titleTextField.getDOMNode().focus();
    }

    if (!body) {
      NewPostActions.invalidBody();
    }

    if (title && body) {
      NewPostActions.newPost(title, body);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='jumbotron'>
          <h1>Create a new post</h1>
        </div>
        <div className='row fadeInUp animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.titleValidationState}>
                    <label className='control-label'>Title</label>
                    <input type='text' className='form-control' ref='titleTextField' value={this.state.title}
                           onChange={NewPostActions.updateTitle} autoFocus/>
                  </div>
                  <div className={'form-group ' + this.state.bodyValidationState}>
                    <label className='control-label'>Body</label>
                    <input type='text' className='form-control' ref='bodyTextField' rows="3" value={this.state.body}
                           onChange={NewPostActions.updateBody} autoFocus/>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;