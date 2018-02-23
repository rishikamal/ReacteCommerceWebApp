import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class AddProductModel extends React.Component{
	constructor(props){
		super(props);
		this.state={
			categoryList: [],
			productList: [],
			vendorList: [],
		}
		this.getCategoryList = this.getCategoryList.bind(this);
		this.getProductList = this.getProductList.bind(this);
		this.getVendorList = this.getVendorList.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddProductModel = this.handleAddProductModel.bind(this);
		this.handleErrorMsg = this.handleErrorMsg.bind(this);
	}

	componentDidMount(){
		this.getCategoryList();
		this.getProductList();
		this.getVendorList();
	}

	getVendorList(){
		$.ajax({
			url: "http://192.168.0.128:8000/vendor_list/",
			headers: {
				Authorization: "Token "+localStorage['token'],
			},
			method: "GET",
			cache: false,
		}).done((res)=>{
			this.setState({vendorList: res})
		}).fail((err)=>{
			this.handleErrorMsg("Error: "+err)
		})
	}

	getCategoryList(){
		$.ajax({
			url: "http://192.168.0.128:8000/category_list/",
			headers : {
				Authorization : "Token "+ localStorage['token'],
			},
			method: "GET",
		}).done((res)=>{
			this.setState({categoryList: res})
		}).fail((err)=>{
			this.handleErrorMsg("Error: "+err)
		})
	}

	getProductList(){
		$.ajax({
			url: "http://192.168.0.128:8000/product_list/",
			headers : {
				Authorization : "Token "+ localStorage['token'],
			},
			method: "GET",
		}).done((res)=>{
			this.setState({productList: res})
		}).fail((err)=>{
			this.handleErrorMsg("Error: "+err)
		})
	}

	handleErrorMsg(msg){
		$("#productModelError").text(msg)
	}

	handleSubmit(event){

			var productModel = new FormData();
			productModel.append('category', this.refs.categoryName.value);
			productModel.append('vendors', this.refs.vendorName.value);
			productModel.append('product', this.refs.productName.value);
			productModel.append('name', this.refs.name.value);
			productModel.append('detail', this.refs.detail.value);
			productModel.append('size', this.refs.size.value);
			productModel.append('color', this.refs.color.value);
			productModel.append('brand', this.refs.brand.value);
			productModel.append('price', this.refs.price.value);
			this.handleAddProductModel(productModel);
	}

	handleAddProductModel(productModel){
		$.ajax({
			url: "http://192.168.0.128:8000/addvariety/",
			headers : {
				Authorization : "Token "+ localStorage['token'],
			},
			method: "POST",
			data: productModel,
			contentType : false,
			processData: false,
			cache: false
		}).done((res)=>{
			this.handleErrorMsg("Product Model Successfully Added!")
		}).fail((err)=>{
			this.handleErrorMsg("Error: "+err)
		})
	}

	logout(event){
		localStorage.clear();
		this.props.history.push("/")
	}


	render(){

		var catList="";
		var vendors = "";
		var products = "";

		if(this.state.productList){
			products = this.state.productList.map(function(item, index){
				return(
					<option key={index} id={item.id} value={item.id}>{item.name}</option>
					)
			})
		}

		if(this.state.categoryList){
			catList = this.state.categoryList.map(function(category, index){
				return(
						<option key={index} id={category.id} value={category.name}>{category.name}</option>
					)
			}, this);
		}

		if(this.state.vendorList){
			vendors = this.state.vendorList.map(function(vendor, index){
				return(
						<option key={index} id={vendor.id} value={vendor.name}>{vendor.name}</option>
					)
			})
		}

		return(
			<div>
				<Header />	
				<div className= "row container">
				<AdminControls />
				<div className="col-md-9 col-sm-9 col-lg-9">
				<div className= "row">
					<h3 className="col-md-9">Add Product Model</h3>
					<div className="col-md-2">
						<button className="btn btn-small btn-info logoutBtn" onClick={this.logout}>Logout</button>
					</div>
				</div>
					<label id="productError"></label>
					<form className="col-md-4" method="POST" action="" onSubmit={this.handleSubmit}>
						<input className="form-control inputForm" type="text" ref="name" id="name" placeholder="Name" required/>
						<input className="form-control inputForm" type="text" ref="detail" id="detail" placeholder="Description" required/>
						<select value="" className="form-control inputForm" id="productName" ref="productName" required>
							<option value="" disabled hidden>Select Cateogry</option>
							{products}
						</select>
						<select value="" className="form-control inputForm" id="categoryName" ref="categoryName" required>
							<option value="" disabled hidden>Select Cateogry</option>
							{catList}
						</select>
						<select value="" className="form-control inputForm" ref="vendorName" id="vendorName" required >
							<option value="" disabled hidden>Select Vendor</option>
							{vendors}
						</select>
						<input className="form-control inputForm" type="text" ref="size" id="size" placeholder="Size" required/>
						<input className="form-control inputForm" type="text" ref="color" id="color" placeholder="Color" required/>
						<input className="form-control inputForm" type="text" ref="brand" id="brand" placeholder="Brand" required/>
						
						<button className="form-control inputForm btn btn-primary" type="submit" value="submit">Add Product Model</button>
					</form>
				</div>
			</div>
			</div>
			)
	}
}