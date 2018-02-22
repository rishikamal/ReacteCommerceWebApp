import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";

export default class UserControls extends React.Component{
	render(){
		return(
			<div className="col-md-3 col-sm-3 col-lg-3 navBar">
						<h4><Link to="/">Home</Link></h4>
						<h4><Link to="/electronics">Electronics</Link></h4>
						<h4><Link to="/electronics">Clothing</Link></h4>
						<h4><Link to="/electronics">Footwear</Link></h4>
			</div>
			)
	}
}