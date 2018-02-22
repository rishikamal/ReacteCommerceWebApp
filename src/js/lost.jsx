import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header'
import UserControls from './usercontrols'
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";

export default class Lost extends React.Component{

	constructor(props){
		super(props);
	}

	logout(event){
		localStorage.clear();
		this.props.history.push("/")
	}

	render(){

		var navBar = <div className="col-md-3 col-sm-3 col-lg-3 navBar">
							<h4><Link to="/">Home</Link></h4>
							<h4><Link to="/login">Login</Link></h4>
							<h4><Link to="/register">Register</Link></h4>
					</div>
		var logoutbtn="";
			if(localStorage['token']){
				navBar = <UserControls />
				logoutbtn = <div className="col-md-2">
								<button className="btn btn-small btn-info logoutBtn" onClick={this.logout.bind(this)}>Logout</button>
							</div>
			}

		return(<div>
				<Header />
				<div className="row container">
					{navBar}
					<div className="col-md-9 col-sm-9 col-lg-9">
					<div className= "row">
						<h2 className="col-md-9">NO SNEAK PEAK! GO HOME BUD!</h2>
						{logoutbtn}
					</div>	
				</div>
				</div>
			</div>
				
			)
	}
}