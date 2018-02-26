import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class DeleteProduct extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			productList : [],
		}
		this.getProductList = this.getProductList.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
		this.deleteErrorMsg = this.deleteErrorMsg.bind(this);
	}

	componentDidMount(){
		this.getProductList();
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
			this.deleteErrorMsg("Error: "+err)
			console.log(err.statusText);
		})

	}

	handleFormSubmit(event){
		event.preventDefault();
		this.handleDeleteProduct();
	}

	handleDeleteProduct(){
		$.ajax({
			url:"http://192.168.0.128:8000/productupdatedelete/"+this.refs.productValue.value+"/",
			headers : {
				Authorization : "Token "+ localStorage['token'],
			},
			method: "DELETE",
			processData: false,
			contentType: false,
			cache: false,
		}).done((res)=>{
			this.deleteErrorMsg("Product Deleted Successfully!")
		}).fail((err)=>{
			this.deleteErrorMsg("Error: "+err)

		})
	}

	deleteErrorMsg(msg){
		$("#deleteMessage").text(msg);
	}

	render(){
		var products = "";
		if(this.state.productList){
			products = this.state.productList.map(function(item, index){
				return(
					<option key={index} id={item.id} value={item.id}>{item.name}</option>
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
					<h3 className="col-md-9">Delete Product</h3>
					<div className="col-md-2">

					</div>
				</div>
				<label id="deleteMessage"></label>
				<form className="col-md-4" onSubmit={this.handleFormSubmit} action="" method="DELETE">
					<select className="form-control inputForm" ref="productValue" id="productValue" required>
						<option disabled hidden selected>Select Product</option>
						{products}
					</select>
					<button className="form-control btn btn-primary inputForm" type="Submit" value="Submit">Delete</button>
				</form>
			</div>
			</div>
		</div>
		)
	}
}