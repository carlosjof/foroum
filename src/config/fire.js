import firebase from 'firebase';

	const config = {
    apiKey: "AIzaSyA9-ImaGQqTZdftKLPD0WpLqt3hPcPB2KA",
    authDomain: "finalproject-fa482.firebaseapp.com",
    databaseURL: "https://finalproject-fa482.firebaseio.com/",
    projectId: "finalproject-fa482",
    storageBucket: "finalproject-fa482.appspot.com",
    messagingSenderId: "584631997755"
  	};
    
  	const fire = firebase.initializeApp(config);
  	export default fire;