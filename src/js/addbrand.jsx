import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class AddBrand extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			brandList: [],
		}
		this.submitForm = this.submitForm.bind(this);
		this.handleAddBrand = this.handleAddBrand.bind(this);
		this.getBrandList = this.getBrandList.bind(this);
		this.handleErrorMsg = this.handleErrorMsg.bind(this);
	}

	componentDidMount(){
		this.getBrandList();
	}

	getBrandList(){
		$.ajax({
			url: "http://192.168.0.128:8000/brand_list/",
			headers: {
				Authorization: "Token "+localStorage['token'],
			},
			method: "GET",
			cache: false,
		}).done((res)=>{
			this.setState({brandList: res})

		}).fail((err)=>{
			this.handleErrorMsg("Error: "+err)
		})


	}

	submitForm(event){
		event.preventDefault();
		var brandInfo = new FormData();
		brandInfo.append('name', this.refs.name.value);
		brandInfo.append('detail', this.refs.companyName.value);
		brandInfo.append('address', this.refs.address.value);
		this.handleAddBrand(brandInfo);
	}

	handleAddBrand(brandInfo){
		$.ajax({
			url: "http://192.168.0.128:8000/addbrand/",
			headers: {
				Authorization: "Token "+ localStorage['token'],
			},
			method: "POST",
			data: brandInfo,
			processData: false,
			contentType: false,
			cache: false,
		}).done(()=>{
			this.handleErrorMsg("Brand Added Successfully!")
		}).fail((err)=>{
			this.handleErrorMsg("Error: "+err);
		})
	}

	handleErrorMsg(msg){
		$("#ErrorMsg").text(msg);
	}

	render(){
		return(
			<div>
			<Header />
			<div className="row container">
			<AdminControls />
			<div className="col-md-9 col-sm-9 col-lg-9">
			<h3>Add Brand</h3>
				<label id="ErrorMsg"></label>
				<form className="col-md-4" onSubmit={this.submitForm} action="" method="POST">
					<input className="form-control inputForm" type="text" id="name" ref="name" placeholder="Brand Name" required />
					<input className="form-control inputForm" type="text" id="detail" ref="detail" placeholder="Description" required />
					<button className="btn btn-primary form-control inputForm" type="Submit" value="Submit">Add Brand</button> 
				</form>
			</div>
			</div>
			</div>
		)
	}
}