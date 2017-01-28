import alt from '../alt';

class NewPostActions {
  constructor() {
    this.generateActions(
      'invalidTitle',
      'updateTitle',
      'invalidBody',
      'updateBody',
      'newPostSuccess',
      'newPostFail'
    );
  }

  newPost(title, body) {
    $.ajax({
      type: 'POST',
      url: '/api/posts',
      data: {title: title, body: body}
    })
      .done((data) => {
        this.actions.newPostSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.newPostFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(NewPostActions);