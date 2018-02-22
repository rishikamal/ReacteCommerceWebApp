import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class DeleteVendor extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			vendorList : [],
		}
		this.getVendorList = this.getVendorList.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleDeleteVendor = this.handleDeleteVendor.bind(this);
		this.deleteErrorMsg = this.deleteErrorMsg.bind(this);
	}

	componentDidMount(){
		this.getVendorList();
	}

	getVendorList(){
		$.ajax({
		url: "http://192.168.0.128:8000/vendor_list/",
		headers : {
			Authorization : "Token "+ localStorage['token'],
		},
		method: "GET",
		}).done((res)=>{
			this.setState({vendorList: res})
		}).fail((err)=>{
			this.deleteErrorMsg("Error: "+err)
		})
	}

	handleFormSubmit(event){
		event.preventDefault();
		this.handleDeleteVendor();
	}

	handleDeleteVendor(){
		$.ajax({
			url:"http://192.168.0.128:8000/vendorupdatedelete/"+this.refs.vendorValue.value+"/",
			headers : {
				Authorization : "Token "+ localStorage['token'],
			},
			method: "DELETE",
			processData: false,
			contentType: false,
			cache: false,
		}).done((res)=>{
			this.deleteErrorMsg("Vendor Deleted Successfully!")
			this.getVendorList();
		}).fail((err)=>{
			this.deleteErrorMsg("Error: "+err)
		})
	}

	deleteErrorMsg(msg){
		$("#deleteMessage").text(msg);
	}

	render(){
		var vendors = "";
		if(this.state.vendorList){
			vendors = this.state.vendorList.map(function(item, index){
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
			<h3>Delete Vendor</h3>
				<label id="deleteMessage"></label>
				<form className="col-md-4" onSubmit={this.handleFormSubmit} action="" method="DELETE">
					<select defaultValue="" ref="vendorValue" id="vendorValue" className="form-control inputForm" required>
						<option disabled hidden value="">Select Vendor</option>
						{vendors}
					</select>
					<button className=" form-control btn btn-primary inputForm" type="Submit" value="Submit">Delete Vendor</button>
				</form>
			</div>
			</div>
		</div>
		)
	}
}