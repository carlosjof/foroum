import React, { Component } from 'react';
import './App.css';

import Header from './component/header';
import Posts from './component/posts';
import Userpost from './component/userpost';
import firebase from './config/fire';

class App extends Component {

  constructor(props){
    super(props);

    this.addPost = this.addPost.bind(this);

    this.state = {
      posts: [],

    }
  }


  componentWillMount(){
    const previousPost = this.state.posts;

    firebase.database().ref('post/').on('child_added', snap => {
      previousPost.push({
          id: snap.previousPost,
          postContent: snap.val().postContent,
      })

      this.setState({ 
        posts: previousPost
      })
    })
  }

  addPost(post){
    const previousPost = this.state.posts;
    let useremail, uid;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    useremail = user.email;
    uid = user.uid;
  }
   firebase.database().ref("post/").push().set({id: previousPost.length + 1, 
                                                postContent: post, 
                                                userId: uid, 
                                                userpost: useremail
                                              });  
        });
    }  

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="title"> fóroum </h2>
          <Header/>
          
        </div>
        <div className="makePost">
          <Posts addPost={this.addPost}/>
        </div>

        <div className="showPosts">
          <div className="postHeader">
            <div className="heading"></div>
          </div>
          <div className="postBody">
          {

            this.state.posts.map((post) =>{
              return(
                <Userpost postContent={post.postContent} postId={post.id} key={post.id}/>
              )
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
