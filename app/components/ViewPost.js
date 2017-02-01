import React from 'react';
import ViewPostStore from '../stores/ViewPostStore';
import ViewPostActions from '../actions/ViewPostActions';

class ViewPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = ViewPostStore.getState();
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		ViewPostStore.listen(this.onChange);
		ViewPostActions.getPost(this.props.params.postId)
	}
	componentWillUnmount() {
		ViewPostStore.unlisten(this.onChange);
	}
	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div className='container'>
				<div className='jumbotron'>
					<h1>{this.state.title}</h1>
				</div>
				<div className='row fadeInUp animated'>
					<div className='col-sm-8'>
						<div className='panel panel-default'>
							<div className='panel-body'>
								{this.state.body}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewPost;
