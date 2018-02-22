import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";
import Header from './header'

export default class Registration extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
		this.handleRegistration = this.handleRegistration.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.handleRegisterMessage = this.handleRegisterMessage.bind(this);
	}

	componentDidMount(){

	}

	submitForm(event){
		event.preventDefault();
		var formData = new FormData();
		formData.append('username', this.refs.username.value);
	//	formData.append('first_name', this.refs.fname.value );
	//	formData.append('last_name', this.refs.lname.value);
		formData.append('email', this.refs.email.value);
		formData.append('phone_number', this.refs.mob.value);
	//	formData.append('address', this.refs.addr.value);
		if(this.refs.pass.value === this.refs.cnf_pass.value){
			formData.append('password', this.refs.pass.value);
			this.handleRegistration(formData);
		}
		else
			this.handleRegisterMessage("Password Did Not Match!!")		
	}

	handleRegistration(formData){
		$.ajax({

			url: 'http://192.168.1.15:8000/registration/',
			method: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			cache: false,
		}).done((res)=> {
			this.handleRegisterMessage("Registration Successful! Redirecting to Login...")
			setTimeout(function(){		
				this.props.history.push("/");		
			}, 1000)

		}).fail((err)=>{
			this.handleRegisterMessage("Error: "+err);
		})
	}

	handleRegisterMessage(msg){
		$("#RegisterationMessage").text(msg)
	}

	render(){
		return(
				<div>
				<Header />	
				<div className="row container">		
					<div className="col-md-3 col-sm-3 col-lg-3 navBar">
						<h4><Link to="/">Home</Link></h4>
						<h4><Link to="/login">Login</Link></h4>
					</div>	
					<div className="col-md-9 col-sm-9 col-lg-9">
						<h3>Registration Form</h3>
						<label id="RegisterationMessage"></label>
						<form className="col-md-4" method="POST" action="" onSubmit={this.submitForm}>
							<input type="text" className="form-control inputForm" id="username" ref="username" placeholder="Username" required/>
							<input type="text" className="form-control inputForm" id="fname" ref="fname" placeholder="First Name" required/>
							<input type="text" className="form-control inputForm" id="lname" ref="lname" placeholder="Last Name" required/>
							<input type="email" className="form-control inputForm" id="email" ref="email" placeholder="Email" required/>
							<input type="text" className="form-control inputForm" id="mob" ref="mob" placeholder="Mobile" required/>
							<input type="text" className="form-control inputForm" id="addr" ref="addr" placeholder="Address" required/>
							<input type="password" className="form-control inputForm" id="pass" ref="pass" placeholder="Password" required/>
							<input type="password" className="form-control inputForm" id="cnf_pass" ref="cnf_pass" placeholder= "Re-Type Password" required/>
							<button type="submit" className="btn btn-large btn-primary inputForm" value="Submit">Submit</button>
						</form>
					</div>
				</div>
				</div>
			)
	}
}