import alt from '../alt';
import NewPostActions from '../actions/NewPostActions';

class NewPostStore {
  constructor() {
    this.bindActions(NewPostActions);
    this.title = '';
    this.body = '';
    this.titleValidationState = '';
    this.bodyValidationState = '';
  }
  onNewPostSuccess(successMessage) {
    toastr.clear()
    this.titleValidationState = 'has-success';
    toastr.success("Post Successfully Added!");
  }
  onNewPostFail(errorMessage) {
    toastr.clear()
    this.titleValidationState = 'has-error';
    toastr.error("ERROR: Title already exists for another post.");
  }
  onUpdateTitle(event) {
    this.title = event.target.value;
    this.titleValidationState = '';
  }
  onInvalidTitle() {
    toastr.clear()
    this.titleValidationState = 'has-error';
    toastr.error('ERROR: Please give your post a title.');
  }
  onUpdateBody(event) {
    this.body = event.target.value;
    this.bodyValidationState = '';
  }
  onInvalidBody() {
    toastr.clear()
    this.bodyValidationState = 'has-error';
    toastr.error('ERROR: Please enter some body text.');
  }
}

export default alt.createStore(NewPostStore);