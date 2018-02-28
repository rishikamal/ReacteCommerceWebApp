import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './header'
import AdminControls from './admincontrols';
import UserControls from './usercontrols'
import SearchProduct from './searchproduct'
import MySelect from './myselect'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Home extends React.Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		if(!localStorage['token'])
			this.props.history.push('/')
	}

	render(){
			var navBar= "";
			if(!localStorage['token']){
				navBar= <UserControls />
			}
			else{
				if(localStorage['isAdmin']== 'true')
					navBar = <AdminControls />
			}

		return (
			<div>
				<Header />
				<div className="row container">
					{navBar}
					<div className="col-md-9 col-sm-9 col-lg-9">
					<div className= "row">
						<h3 className="col-md-9">Welcome Home</h3>
					</div>

					
					<SearchProduct />
				</div>
				</div>
			</div>
			)
	}
}

//<MySelect />