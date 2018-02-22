import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect  } from "react-router-dom";

export default class AdminControls extends React.Component{
	render(){
		return(
			<div className="col-md-3 col-sm-3 col-lg-3 navBar">
				<h4><Link to="/">Home</Link></h4>
				<h4><Link to="/adminprofile">Admin Profile</Link></h4>
				<h4><Link to="/addcategory">Add Category</Link></h4>
				<h4><Link to="/updatecategory">Update Category</Link></h4>
				<h4><Link to="/deletecategory">Delete Category</Link></h4>
				<h4><Link to="/addproduct">Add Product</Link></h4>
				<h4><Link to="/updateproduct">Update Product</Link></h4>
				<h4><Link to="/deleteproduct">Delete Product</Link></h4>
				<h4><Link to="/addvendor">Add Vendor</Link></h4>
				<h4><Link to="/updatevendor">Update Vendor</Link></h4>
				<h4><Link to="/deletevendor">Delete Vendor</Link></h4>
				<h4><Link to="/addbrand">Add Brand</Link></h4>				
				<h4><Link to="/addproductmodel">Add Product Model</Link></h4>
				
				
			</div>
			)
	}
}