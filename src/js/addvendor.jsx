import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class AddVendor extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			vendorList: [],
		}
		this.submitForm = this.submitForm.bind(this);
		this.handleAddVendor = this.handleAddVendor.bind(this);
		this.getVendorList = this.getVendorList.bind(this);
		this.handleErrorMsg = this.handleErrorMsg.bind(this);
	}

	componentDidMount(){
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

	submitForm(event){
		event.preventDefault();
		var vendorInfo = new FormData();
		vendorInfo.append('name', this.refs.name.value);
		vendorInfo.append('company_name', this.refs.companyName.value);
		vendorInfo.append('address', this.refs.address.value);
		this.handleAddVendor(vendorInfo);
	}

	handleAddVendor(vendorInfo){
		$.ajax({
			url: "http://192.168.0.128:8000/addvendor/",
			headers: {
				Authorization: "Token "+ localStorage['token'],
			},
			method: "POST",
			data: vendorInfo,
			processData: false,
			contentType: false,
			cache: false,
		}).done(()=>{
			this.handleErrorMsg("Vendor Added Successfully!")
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
			<h3>Add Vendor</h3>
				<label id="ErrorMsg"></label>
				<form className="col-md-4" onSubmit={this.submitForm} action="" method="POST">
					<input className="form-control inputForm" type="text" id="name" ref="name" placeholder="Vendor Name" required />
					<input className="form-control inputForm" type="text" id="companyName" ref="companyName" placeholder="Company Name" required />
					<input className="form-control inputForm" type="text" id="address" ref="address" placeholder="Company Address" required />
					<button className="form-control btn btn-primary inputForm" type="Submit" value="Submit">Add Vendor</button> 
				</form>
			</div>
			</div>
			</div>
		)
	}
}