import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";
import AdminControls from './admincontrols';
import UserControls from './usercontrols'
import Header from './header'

export default class Dashboard extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		if(!localStorage['token'])
			this.props.history.push('/')
	}

	render(){

		var navBar="";
		if(localStorage['isAdmin'] == 'true'){
			navBar = <AdminControls />
		}
		else{

			navBar= <UserControls />
		}
		

		return(  
			<div>
				<Header />
				<div className="row container">
					{navBar}
					<div className="col-md-9 col-sm-9 col-lg-9">
					<div className= "row">
						<h3 className="col-md-9">Dashboard</h3>
						<div className="col-md-2">

						</div>
					</div>
		
				</div>
				</div>
			</div>
			)
	}
}