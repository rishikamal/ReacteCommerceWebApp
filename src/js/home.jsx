import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header'
import AdminControls from './admincontrols';
import UserControls from './usercontrols'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Home extends React.Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		if(!localStorage['token'])
			this.props.history.push('/')
	}

	logout(event){
		localStorage.clear();
		this.props.history.push("/")
	}

	render(){
			var navBar= "";
			var logoutbtn="";
			if(!localStorage['token']){
				navBar= <div className="col-md-3 col-sm-3 col-lg-3 navBar">
							<h4><Link to="/login">Login</Link></h4>
							<h4><Link to="/register">Register</Link></h4>
						</div>
			}
			else{
				if(localStorage['isAdmin']== 'true')
					navBar = <AdminControls />
				else
					navBar = <UserControls />

				logoutbtn = <div className="col-md-2">
								<button className="btn btn-small btn-info logoutBtn" onClick={this.logout.bind(this)}>Logout</button>
							</div>
			}

		return (
			<div>
				<Header />
				<div className="row container">
					{navBar}
					<div className="col-md-9 col-sm-9 col-lg-9">
					<div className= "row">
						<h3 className="col-md-9">Welcome Home</h3>
						{logoutbtn}
					</div>
		
				</div>
				</div>
			</div>
			)
	}
}