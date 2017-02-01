import alt from '../alt';
import ViewPostActions from '../actions/ViewPostActions';

class ViewPostStore {
  constructor() {
		this.bindActions(ViewPostActions);
    this.title = '';
    this.body = '';
  }

	onGetPostSuccess(data) {
		this.title = data.title
		this.body = data.body
	}

	onGetPostFail(errorMessage) {
		toastr.error(errorMessage);
	}
}

export default alt.createStore(ViewPostStore);
