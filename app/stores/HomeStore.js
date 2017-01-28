import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.posts = [];
  }

  onGetPostsSuccess(data) {
    this.posts = data
  }

  onGetPostsFail(errorMessage) {
    toastr.error(errorMessage);
  }

	onDeletePostFail(errorMessage) {
		toastr.error(errorMessage);
	}
}

export default alt.createStore(HomeStore);