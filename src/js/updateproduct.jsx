import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class UpdateProduct extends React.Component{
	constructor(props){
		super(props);
		this.state={
			productList : [],
			categoryList : [],
			productid : "",
			categoryid :"",
			prodName : "",
			prodCat : "",
		}

		this.getCategoryList = this.getCategoryList.bind(this);
		this.getProductList = this.getProductList.bind(this);
		this.handleProductError = this.handleProductError.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
		this.handlenewcategory = this.handlenewcategory.bind(this);
		this.handlenewproducts = this.handlenewproducts.bind(this);
	}

	componentDidMount(){
		this.getProductList();
		this.getCategoryList();
		$("#inputControls").hide();
	}

	handleProductError(msg){
		$("#productError").text(msg)
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

	handleSubmit(event){
		event.preventDefault();
		var updateData = new FormData();
		updateData.append('name', this.refs.NewProductName.value);
		updateData.append('category', this.state.categoryid);
		this.handleUpdateProduct(updateData);
		
	}

	handleUpdateProduct(updateData){
		$.ajax({
			url:"http://192.168.0.128:8000/productupdatedelete/"+this.state.productid+"/",
			headers : {
				Authorization : "Token "+ localStorage['token'],
			},
			method: "PUT",
			data: updateData,
			processData: false,
			contentType: false,
			cache: false,
		}).done((res)=>{
			this.handleProductError("Product Updated Successfully!")
		}).fail((err)=>{
			this.handleProductError("Error: "+err)
		})

	}

	handlenewcategory(event){
		this.setState({ categoryid : event.target.value}, function(){
		})
	}

	handleprodname(event){
		this.setState({ prodName :  event.target.value})
	}	

	handlenewproducts(event){
		var name = "";
		var id = event.target.value;
		var catid = "";
		var list = this.state.productList;

		for(var i=0; i<list.length; i++){
			if(list[i].id == id){
				name= list[i].name;
				catid = list[i].category.id;
			}
		}

		this.setState({ productid : id,
						prodName: name,
						categoryid : catid,
					}, function(){
			$("#inputControls").show();
		})
	}
		
	render(){
		var products="";
		var categories = "";
		var vendorsList= "";
		if(this.state.productList){
			products = this.state.productList.map(function(item, index){
				return (
					<option key={index} id={item.id} value={item.id}>{item.name}</option>
					
					)
			})

		}

		if(this.state.productList){
			this.state.productList.map(function(item, index){
				if(item.id == this.state.productid){
					vendorsList = item.vendors.map(function(vend, index){
						return (
							<option key={vend} id={vend.id} value={vend.id}>{vend.name}</option>
						)
					})
				}
			}, this)
		}

		if(this.state.categoryList){
			categories = this.state.categoryList.map(function(category, index){
				return (
					<option key={index} id={category.id} value={category.id}>{category.name}</option>
					)
			})
		}

		return(
				<div>
				<Header />	
				<div className="row container">
				<AdminControls />
				<div className="col-md-9 col-sm-9 col-lg-9">
				<div className= "row">
					<h3 className="col-md-9">Update Product</h3>
					<div className="col-md-2">

					</div>
				</div>
				<label id="productError"></label>
					<form onSubmit={this.handleSubmit} className="col-md-4" action="" method="PUT">
						<select className="form-control inputForm" defaultValue={this.state.productid} id="productName" ref="productName" onChange={this.handlenewproducts} required >
							<option value="" disabled hidden>Select Product</option>
							{products}
						</select>
						<div className="fgroup " id="inputControls">
							<input type="text" className="form-control inputForm"  id="NewProductName" ref="NewProductName" value={this.state.prodName} onChange={this.handleprodname.bind(this)} required/>
							<select value={this.state.categoryid} className="form-control inputForm"  id="Newcategory" ref="Newcategory" onChange={this.handlenewcategory} required>
								{categories}
							</select>
							<select className="form-control read-only inputForm" id="vendorName">
								{vendorsList}
							</select>
						</div>
						<button type="submit" className="form-control btn btn-primary inputForm" value="submit">Update</button>
					</form>
				</div>
				</div>
			</div>
			)
	}
}