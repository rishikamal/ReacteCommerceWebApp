import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AdminControls from './admincontrols';
import Header from './header'

export default class AddCategory extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			categoryList: [],
		}
		this.submitForm = this.submitForm.bind(this);
		this.handleAddCategory = this.handleAddCategory.bind(this);
		this.getCategoryList = this.getCategoryList.bind(this);
		this.handleErrorMsg = this.handleErrorMsg.bind(this);
	}

	componentDidMount(){
		this.getCategoryList();
	}

	getCategoryList(){
		$.ajax({
			url: "http://192.168.0.128:8000/category_list/",
			headers: {
				Authorization: "Token "+localStorage['token'],
			},
			method: "GET",
			cache: false,
		}).done((res)=>{
			this.setState({categoryList: res})

		}).fail((err)=>{
			this.handleErrorMsg("Error: "+err)
		})


	}

	submitForm(event){
		event.preventDefault();
		var categoryInfo = new FormData();
		categoryInfo.append('name', this.refs.name.value);
		categoryInfo.append('detail', this.refs.detail.value);
		this.handleAddCategory(categoryInfo);
	}

	handleAddCategory(categoryInfo){
		$.ajax({
			url: "http://192.168.0.128:8000/addcategory/",
			headers: {
				Authorization: "Token "+ localStorage['token'],
			},
			method: "POST",
			data: categoryInfo,
			processData: false,
			contentType: false,
			cache: false,
		}).done(()=>{
			this.handleErrorMsg("Cateogry Added Successfully!")
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
				<h3>Add Category</h3>
				<label id="ErrorMsg"></label>
				<form className="col-md-4" onSubmit={this.submitForm} action="" method="POST">
					<input className="fgroup form-control inputForm" type="text" id="name" ref="name" placeholder="Category Name" required />
					<input className="fgroup form-control inputForm" type="text" id="detail" ref="detail" placeholder="Category Detail" required />
					<button className="form-control btn btn-primary inputForm" type="Submit" value="Submit">Add Category</button> 
				</form>
			</div>
			</div>
			</div>
		)
	}
}