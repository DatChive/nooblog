import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getPostsSuccess',
      'getPostsFail'
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
}

export default alt.createActions(HomeActions);