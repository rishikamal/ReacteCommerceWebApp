import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class UpdateVendor extends React.Component{
	constructor(props){
		super(props);
		this.state={
			vendorList : [],
			vendorid: "",
			vendName: "",
			compName: "",
			address: "",
		}

		this.getVendorList = this.getVendorList.bind(this);
		this.handleVendorError = this.handleVendorError.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handelNewVendor = this.handelNewVendor.bind(this);
	}

	componentDidMount(){
		this.getVendorList();
	}

	handleVendorError(msg){
		$("#vendorError").text(msg)
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
			this.handleVendorError("Error: "+err)
		})
	}

	handleSubmit(event){
		event.preventDefault();
		var updateData = new FormData();
		updateData.append('name', this.refs.newVendorName.value);
		updateData.append('company_name', this.refs.newCompanyName.value);
		updateData.append('address', this.refs.newAddress.value);
		this.handleUpdateVendor(updateData);
		
	}

	handleUpdateVendor(updateData){
		$.ajax({
			url:"http://192.168.0.128:8000/vendorupdatedelete/"+this.state.vendorid+"/",
			headers :{
				Authorization: "Token "+ localStorage['token'],
			},
			method: "PUT",
			data: updateData,
			processData: false,
			contentType: false,
			cache: false,
		}).done((res)=>{
			this.handleVendorError("Vendor Updated Successfully!")
			this.getVendorList();
		}).fail((err)=>{
			this.handleVendorError("Error: "+err)
		})

	}

	handelNewVendor(event){
		var list = this.state.vendorList;
		this.setState({ vendorid : event.target.value,
						vendName : list[Number(event.target.value)-1].name,
						compName : list[Number(event.target.value)-1].company_name,
						address : list[Number(event.target.value)-1].address, 
					 }, function(){})
	}	

	nameChange(event){
		this.setState({vendName: event.target.value})
	}

	compChange(event){
		this.setState({compName: event.target.value})
	}

	addressChange(event){
		this.setState({address: event.target.value})
	}
		
	render(){
		var vendors= "";
		if(this.state.vendorList){
			vendors = this.state.vendorList.map(function(item, index){
				return (
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
					<h3 className="col-md-9">Update Vendor</h3>
					<div className="col-md-2">

					</div>
				</div>
				<label id="vendorError"></label>
					<form onSubmit={this.handleSubmit} className="col-md-4" action="" method="PUT">
						<select className="form-control inputForm" defaultValue={this.state.vendorid} id="vendorName" ref="vendorName" onChange={this.handelNewVendor} required >
							<option value="" disabled hidden>Select Vendor</option>
							{vendors}
						</select>
						<input type="text" className="form-control inputForm" value={this.state.vendName} onChange={this.nameChange.bind(this)} id="newVendorName" ref="newVendorName" required/>
						<input type="text" className="form-control inputForm" value={this.state.compName} onChange={this.compChange.bind(this)} id="newCompanyName" ref="newCompanyName" required/>
						<input type="text" className="form-control inputForm" value={this.state.address} onChange={this.addressChange.bind(this)} id="newAddress" ref="newAddress" required/>
						<button type="submit" className="form-control btn btn-primary inputForm" value="submit">Update</button>
					</form>
				</div>
				</div>
			</div>
			)
	}
}