import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getPostsSuccess',
      'getPostsFail',
			'deletePostFail'
    );
  }

  getPosts() {
    $.ajax({url: '/api/posts'})
      .done(data => {
        console.log("success ajax")
        this.actions.getPostsSuccess(data);
      })
      .fail(jqXhr => {
        console.log("fail")
        this.actions.getPostsFail(jqXhr.responseJSON.message);
      });
  }

	deletePost(postId) {
		$.ajax({url: '/api/posts/' + postId})
			.done(() => {
				console.log("successful delete")
			})
			.fail(jqXhr => {
				console.log("fail")
				this.actions.deletePostFail(jqXhr.responseJSON.message);
			});
	}
}

export default alt.createActions(HomeActions);
