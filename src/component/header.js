import React, { Component } from 'react';

import Posts from '../component/posts';

import firebase from '../config/fire';
import 'firebase/auth';

class Header extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: ''
		};
	}




	modal() {
		let abrir = document.getElementById("open");
		let cerrar = document.getElementById("close-modal");


		abrir.showModal();

		cerrar.addEventListener('click', e => {
			abrir.close();
		});
	}

	login() {
		let abrir = document.getElementById("show");
		let cerrar = document.getElementById("closer-modal");


		abrir.showModal();

		cerrar.addEventListener('click', e => {
			abrir.close();
		});
	}

	singup() {
		let email = document.getElementById('usuario').value;
		let password = document.getElementById('password').value;
		let username = document.getElementById('nombre').value;
    	let userlastname = document.getElementById('apellido').value;

    	if(email === '' || password === '' || username === '' || userlastname === ''){
    			alert("Tiene que llenar todos campos");
			}else{

				firebase.database().ref("users/").push({
    				username: username,
   					userlastname: userlastname,
   					useremail: email
  				});

				firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
						}).catch(function(error) {
								// Handle Errors here.
								let errorCode = error.code;
								let errorMessage = error.message;
								// ...
			});
				alert("Ya te Registrate? \nSi, Inicia sesion y comienza a postear!");

			}
    	}


	singin() {


		let email = document.getElementById('email').value;
		let password = document.getElementById('password2').value;

		if(email === '' || password === ''){
			alert("Tiene que llenar todos campos");
		}else{

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});

		firebase.auth().onAuthStateChanged((user) => {
  		if (user) {
  			window.location.reload(true);
  			alert("Bienvenido!");
    		document.getElementById('btnhola').style.display = 'none';
  		} else {
  			alert("Presione ENTER o OK para continuar");
  			document.getElementById('btnhola').style.display = 'true';
  		}
		});
	}
	}

	fuera() {
		firebase.auth().signOut().then(() => {
			alert("Esta cerrando sesion...");
			window.location.reload(true);
			document.getElementById('btnlogin').style.display = 'true';
			// Sign-out successful.
		}).catch(function(error) {
			// An error happened.
			alert("im here");
		});
	}

	render() {
		let database = firebase.database();
		let user = firebase.auth().currentUser;
		let useremail;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('btnlogout').style.display = 'true';
    document.getElementById('btnegistro').style.display = 'none';
    document.getElementById('btnlogin').style.display = 'none';

    useremail = user.email;
 	document.getElementById('lblusuario').innerHTML = "Bienvenido " + useremail +  " ";
  } else {
  	document.getElementById('btnlogout').style.display = 'none';
	document.getElementById('lblusuario').style.display = "none";

  }

});

		return ( <div className = "button-side" >

			<label id="lblusuario">USUARIO</label>

			<button id = "btnlogin" onClick = {this.login} > Login < /button>

			<button id = "btnegistro" onClick = {this.modal} > Sign UP! < /button>



			<dialog id = "open" >
			<form onSubmit = {this.singup} >
			<button id = "close-modal" > X </button>

			<h2> Registrate! </h2>

			<label className = "lbltitle" > Usuario* < /label> 
			<input type = "text" id = "usuario" name = "usuario" className = "input" placeholder = "Ingrese Usuario" onChange = {this.handleChange}/>

			<label className = "lbltitle" > Contraseña* < /label> 
			<input type = "password" id = "password" name = "password" className = "input" placeholder = "Ingrese Contraseña" onChange = { this.handleChange }/>

			<label className = "lbltitle" > Nombre* < /label> 
			<input type = "text" id="nombre" name = "nombre" className = "input" placeholder = "Ingrese Nombre" />

			<label className = "lbltitle" > Apellido* < /label> 
			<input type = "text" id="apellido" name = "apellido" className = "input" placeholder = "Ingrese Apellido" />

			<input type = "submit" className = "btnaceptar" value = "Aceptar" />
			</form> 
			</dialog >

			<dialog id = "show" >

			<form onSubmit = { this.singin }>

			<button id = "closer-modal" > X </button>

			<h2> Inicia Sesion! </h2>

			<label className = "lbltitle" > Usuario < /label> 
			<input type = "text" name = "usuario" id = "email" className = "input" placeholder = "Ingrese Usuario" onChange = { this.handleChange }/>

			<label className = "lbltitle" > Contraseña </label> 
			<input type = "password" name = "password" id = "password2" className = "input" placeholder = "Ingrese Contraseña" onChange = { this.handleChange }/>

			<input type = "submit" className = "btnaceptar" value = "Aceptar" />

			</form>

			</dialog>

			<button id="btnlogout" onClick = { this.fuera } > loguot </button> 

			</div>
		);
	}
}

export default Header;