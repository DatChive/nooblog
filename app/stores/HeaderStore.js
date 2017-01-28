import alt from '../alt';
import HeaderActions from '../actions/HeaderActions';

class HeaderStore {
  constructor() {
    this.bindActions(HeaderActions);
    this.connections = 0;
  }

  onUpdateConnections(data) {
    this.connections = data.connections;
  }
}

export default alt.createStore(HeaderStore);