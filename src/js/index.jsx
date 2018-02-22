import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import Lost from './lost'
import Home from './home';
import Login from './Login';
import Dashboard from './dashboard';
import AdminProfile from './adminprofile'
import Registration from './register' 
import AddProduct from "./addproduct"
import UpdateProduct from "./updateproduct"
import DeleteProduct from "./deleteproduct"
import AddVendor from "./addvendor"
import UpdateVendor from "./updatevendor"
import DeleteVendor from "./deletevendor"
import AddCategory from "./addcategory"
import UpdateCategory from "./updatecategory"
import DeleteCategory from "./deletecategory"

ReactDOM.render(<Router>
					<div>
					<Route exact path="/" component={Home}/>
					<Route path="/login" component={Login}/>
					<Route path="/register" component={Registration} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/adminprofile" component={localStorage['isAdmin']== 'true' ? AdminProfile : Lost} />					
					<Route path="/addproduct" component={localStorage['isAdmin']== 'true' ? AddProduct : Lost} />
					<Route path="/updateproduct" component={localStorage['isAdmin']== 'true' ? UpdateProduct : Lost} />
					<Route path="/deleteproduct" component={localStorage['isAdmin']== 'true' ? DeleteProduct : Lost} />
					<Route path="/addvendor" component={localStorage['isAdmin']== 'true' ? AddVendor : Lost} />
					<Route path="/updatevendor" component={localStorage['isAdmin']== 'true' ? UpdateVendor : Lost} />
					<Route path="/deletevendor" component={localStorage['isAdmin']== 'true' ? DeleteVendor : Lost} />
					<Route path="/addcategory" component={localStorage['isAdmin']== 'true' ? AddCategory : Lost } />
					<Route path="/updatecategory" component={localStorage['isAdmin']== 'true' ? UpdateCategory : Lost} />
					<Route path="/deletecategory" component={localStorage['isAdmin']== 'true' ? DeleteCategory : Lost} />					
					</div>
				</Router>, 
				document.getElementById("root"));