import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class DeleteCategory extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			categoryList : [],
			categoryid: "",
		}
		this.getCategoryList = this.getCategoryList.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
		this.deleteErrorMsg = this.deleteErrorMsg.bind(this);
	}

	componentDidMount(){
		this.getCategoryList();
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
			this.deleteErrorMsg("Error: "+err)
		})
	}

	handleFormSubmit(event){
		event.preventDefault();
		this.handleDeleteCategory();
	}

	handleDeleteCategory(){
		$.ajax({
			url:"http://192.168.0.128:8000/categoryupdatedelete/"+this.state.categoryid+"/",
			headers : {
				Authorization : "Token "+ localStorage['token'],
			},
			method: "DELETE",
			processData: false,
			contentType: false,
			cache: false,
		}).done((res)=>{
			this.deleteErrorMsg("Category Deleted Successfully!")
			this.getVendorList();
		}).fail((err)=>{
			this.deleteErrorMsg("Error: "+err)
		})
	}

	deleteErrorMsg(msg){
		$("#deleteMessage").text(msg);
	}

	handlecategorylist(event){
		this.setState({
			categoryid: event.target.value,
		})
	}

	render(){
		var categories = "";
		if(this.state.categoryList){
			categories = this.state.categoryList.map(function(item, index){
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
			<h3>Delete Category</h3>
				<label id="deleteMessage"></label>
				<form className="col-md-4" onSubmit={this.handleFormSubmit} action="" method="DELETE">
					<select value={this.state.categoryid} onChange={this.handlecategorylist.bind(this)} ref="categoryid" id="categoryid" className="form-control inputForm" required>
						<option value="" disabled hidden>Select Category</option>
						{categories}
					</select>
					<button className="form-control btn btn-primary inputForm" type="Submit" value="Submit">Delete Category</button>
				</form>
			</div>
			</div>
		</div>
		)
	}
}