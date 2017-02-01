import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getPostSuccess',
      'getPostFail',
    );
  }

  getPost(postId) {
    $.ajax({url: '/api/post/' + postId})
      .done(data => {
        console.log("success ajax")
        this.actions.getPostSuccess(data);
      })
      .fail(jqXhr => {
        console.log("failed to retrieve post")
        this.actions.getPostFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(HomeActions);
