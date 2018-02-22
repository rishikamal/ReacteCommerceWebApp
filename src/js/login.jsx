import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";
import Header from './header'

export default class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userData: "",
		}
	this.handleLogin = this.handleLogin.bind(this);
	this.validateUser = this.validateUser.bind(this);
	this.handleLoginError = this.handleLoginError.bind(this);
	}

	componentDidMount(){
		if(localStorage['token']){
			this.props.history.push('/dashboard')
		}	
	}

	handleLogin(event){
		event.preventDefault();
		if(localStorage['token']){
			this.handleLoginError("User Already Logged In. Redirecting...")
			this.props.history.push('/dashboard')
			
		}
		else{
			var loginData = new FormData();
			loginData.append('username', this.refs.username.value );
			loginData.append('password', this.refs.pass.value);
			this.validateUser(loginData);
		}

	}

	validateUser(loginData){
		$.ajax({
			url: "http://192.168.0.128:8000/login/",
			method: 'POST',
			data: loginData,
			contentType: false,  
			cache: false,           
			processData:false,
		}).done((res)=>{
			if(res.status.code == 202)
				this.setState({userData : res}, function(){
					localStorage['token'] = res.Token;
					localStorage['isAdmin'] = res.data.is_superuser;
					this.props.history.push('/dashboard')
				})

			else{
				this.handleLoginError(res.status.message)
			}
			
		}).fail(res=> {
			this.handleLoginError(res.status.message)
		})
	}

	handleLoginError(msg){
		$("#loginError").text("Error: "+msg)
	}

	render(){

		return(
			<div>
			<Header />
			<div className="row container">
				<div className="col-md-3 col-sm-3 col-lg-3 navBar">
					<h4><Link to="/">Home</Link></h4>
					<h4><Link to="/register">Register</Link></h4>
				</div>
				<div className="col-md-9 col-sm-9 col-lg-9">
					<h3>Login</h3>
					<label id="loginError"></label>
					<form className="col-md-4" action="" method="POST" onSubmit={this.handleLogin}>
							<input className="form-control inputForm" type="text" ref="username" id="username" placeholder="Username" required/>
							<input className="form-control inputForm" type="password" ref="pass" id="pass" placeholder="Password" required/>
							<button type="submit" className="btn btn-primary inputForm" value="Login">Login</button>
					</form>
				</div>
			</div>
			</div>
			)
	}
}