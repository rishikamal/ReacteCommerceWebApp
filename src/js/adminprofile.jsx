import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";
import AdminControls from './admincontrols';
import Header from './header'

class Profile extends React.Component{
	constructor(props){
		super(props);
		
	}

	render(){
/*		
			var data = [];
			Object.keys(props.data).map(function(key, index){
				var set = {};
				set[key] = props.data[key];
				data.push(set)
			})
			var info = data.map(function(item, index){
				for(var key in item){
					if(item.hasOwnProperty(key)){
						return(
							<label key={index} className="profileLabel">{key} : {item[key]}</label>
						)
					}
				}
			})	
	*/	return (
			<div className="pull-left" style={{marginTop: 40}}>
				<table className="table-striped table-hover usertable" >
					<tbody>
						<tr>
							<td>Username:</td>
							<td>{this.props.profile.username}</td>
						</tr>
						<tr>
							<td>First Name:</td>
							<td>{this.props.profile.first_name }</td>
						</tr>
						<tr>
							<td>Last Name:</td>
							<td>{this.props.profile.last_name}</td>
						</tr>
						<tr>
							<td>Email:</td>
							<td>{this.props.profile.email}</td>
						</tr>
						<tr>
							<td>Mobile:</td>
							<td>{this.props.profile.phone_number}</td>
						</tr>
						<tr>
							<td>Address:</td>
							<td>{this.props.profile.address }</td>
						</tr>
					</tbody>
				</table>
			</div>
			)
		}
}

export default class AdminProfile extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			profile: "",
		}
		this.loadprofile = this.loadprofile.bind(this);
		this.logout = this.logout.bind(this);
	}


	componentDidMount(){
		if(!localStorage['token'])
			this.props.history.push('/')
		else{
			this.loadprofile();
		}
	}

	loadprofile() {
		$.ajax({
			url: "http://192.168.0.128:8000/user_profile/",
			method: "GET",
			headers : {
			   Authorization: 'Token ' + localStorage['token'],
			},
			processData: false,
			contentType: false,  
			cache: false,  
		}).done((res)=>{
			this.setState({profile: res.data})
		}).fail((err)=>
			console.log(err)
			)
	}

	render(){
		var info;
		if(this.state.profile){
			info = <Profile profile={this.state.profile} />
		}
		return(
			<div>
			<Header />
			<div className="row container">
			<AdminControls />
			<div className="col-md-9 col-sm-9 col-lg-9">
				<div className= "row">
					<h3 className="col-md-9">Admin Dashboard</h3>
					<div className="col-md-2">

					</div>
				</div>
				{info}			
			</div>
			</div>
			</div>	
			)
		
	}
}