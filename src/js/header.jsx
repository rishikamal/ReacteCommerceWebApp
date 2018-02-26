import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";

export default class Header extends React.Component{

	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout(){
		localStorage.clear();
		window.open("/", "_SELF")
	}

	render(){
		var login = "";
		var logoutbtn = "";
		if(!localStorage['token'])
			login = <div className="pull-right login-register">
							<h4><Link to="/login">Login</Link></h4><h4>/</h4>
							<h4><Link to="/register">Register</Link></h4>
						</div>
		else
			logoutbtn = <button className="btn btn-small btn-info logoutBtn pull-right login-register" onClick={this.logout}>Logout</button>
		return(
			<div className="header-container">
				{login}
				{logoutbtn}
			</div>
			)
	}
}