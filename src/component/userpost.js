import React, { Component } from 'react';
import './userpost.css';
import PropTypes from 'prop-types';
import Posts from './posts';

class List extends Component {
	constructor(props){
		super(props);
		this.postContent = props.postContent;
		this.postId = props.postId;

	}
	render(props){
		return(
			<div className="post fade-in">
				<p className="postContent">{ this.postContent }</p>
			</div>
		);
	}
}

List.propTypes = {
	postContent: PropTypes.string
}

export default List;