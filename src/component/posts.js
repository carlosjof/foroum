import React, {Component} from 'react';

import './userpost.css'

import List from './userpost';

import firebase from '../config/fire';
import 'firebase/auth';

class Posts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newPostContent: '',
		};

			this.handleUserInput = this.handleUserInput.bind(this);
			this.writePost = this.writePost.bind(this);

		}

	handleUserInput(e){
		this.setState({ newPostContent: e.target.value, });
	}

	writePost(){
		this.props.addPost(this.state.newPostContent);

		this.setState({
			newPostContent: '',
		})
	}

	render() {

								firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('btnlogout').style.display = 'true';
    document.getElementById('btnegistro').style.display = 'none';
    document.getElementById('btnlogin').style.display = 'none';
    document.getElementById('inputpost').style.display = 'true';

  } else {
  	document.getElementById('btnlogout').style.display = 'none';
  	document.getElementById('inputpost').style.display = 'none';

  }
});
		return(

			<div id="inputpost" className="container">
					<textarea value={this.state.newPostContent} className="text-post" id="text-posts" name="posts" placeholder="¿Qué tal todo?" onChange={this.handleUserInput}></textarea>
					<div>
					<button id="btnMakePost" onClick={this.writePost}>Publicar</button>
					</div>			
				<List items={this.state.items}/>
			</div>

			);
	}

}


export default Posts;