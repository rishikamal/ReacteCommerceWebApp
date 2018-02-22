import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class AddProduct extends React.Component{
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
		this.handleAddProduct = this.handleAddProduct.bind(this);
		this.handleProductError = this.handleProductError.bind(this);
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
			this.handleProductError("Error: "+err)
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
			this.handleProductError("Error: "+err)
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
			this.handleProductError("Error: "+err)
		})
	}

	handleProductError(msg){
		$("#productError").text(msg)
	}

	handleSubmit(event){
		var flag = false;
		event.preventDefault();
		this.state.productList.map(function(product, index){
			if(product.name == this.refs.productName.value){
				this.handleProductError("Error: Product already Exists!")
				flag = true;
			}
		}, this)
		if(flag === false){
			var product = new FormData();
			product.append('category', this.refs.categoryName.value);
			product.append('vendors', this.refs.vendorName.value);
			product.append('name', this.refs.productName.value);
			this.handleAddProduct(product);
		}
	}

	handleAddProduct(product){
		$.ajax({
			url: "http://192.168.0.128:8000/addproduct/",
			method: "POST",
			data: product,
			contentType : false,
			processData: false,
			cache: false
		}).done((res)=>{
			this.handleProductError("Product Successfully Added!")
		}).fail((err)=>{
			this.handleProductError("Error: "+err)
		})
	}

	render(){

		var catList="";
		var vendors = "";
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
				<h3>Add Product</h3>
					<label id="productError"></label>
					<form className="col-md-4" method="POST" action="" onSubmit={this.handleSubmit}>
						<input className="form-control inputForm" type="text" ref="productName" id="productName" placeholder="Product Name" required/>
							<select className="form-control inputForm" id="categories" ref="categoryName" required>
							<option disabled hidden selected>Select Cateogry</option>
							{catList}
							</select>
							<select className="form-control inputForm" ref="vendorName" id="vendorName" required >
								<option disabled selected hidden>Select Vendor</option>
								{vendors}
							</select>
						<button className="form-control inputForm" type="submit" value="submit" className="btn btn-primary">Add Product</button>
					</form>
				</div>
			</div>
			</div>
			)
	}
}