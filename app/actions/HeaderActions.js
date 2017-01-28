import alt from '../alt';

class HeaderActions {
  constructor() {
    this.generateActions(
      'updateConnections',
    );
  }
}

export default alt.createActions(HeaderActions);