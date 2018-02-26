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
			categoryid : "",
			catName: "",
			catDetail: "",
		}
		this.submitForm = this.submitForm.bind(this);
		this.handleUpdateCategory = this.handleUpdateCategory.bind(this);
		this.getCategoryList = this.getCategoryList.bind(this);
		this.handleErrorMsg = this.handleErrorMsg.bind(this);
	}

	componentDidMount(){
		$("#categorycontrols").hide();
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
		categoryInfo.append('name', this.state.catName);
		categoryInfo.append('detail', this.state.catDetail);
		this.handleUpdateCategory(categoryInfo);
	}

	handleUpdateCategory(categoryInfo){
		$.ajax({
			url: "http://192.168.0.128:8000/categoryupdatedelete/"+this.state.categoryid+"/",
			headers: {
				Authorization: "Token "+ localStorage['token'],
			},
			method: "PUT",
			data: categoryInfo,
			processData: false,
			contentType: false,
			cache: false,
		}).done(()=>{
			this.handleErrorMsg("Category Updated Successfully!")
		}).fail((err)=>{
			this.handleErrorMsg("Error: "+err);
		})
	}

	handleErrorMsg(msg){
		$("#ErrorMsg").text(msg);
	}

	handlenewcategory(event){
		event.persist();
		$("#categorycontrols").show();
		var list = this.state.categoryList;
		var id = event.target.value;
		var name = "";
		var detail = "";
		for(var i=0; i<list.length; i++){
			if(list[i].id == event.target.value){
					name = list[i].name;
					detail = list[i].detail;
					break;
				}				
			}
		
		this.setState({
			catName: name,
			catDetail: detail,
			categoryid: id,
		})
	}

//		console.log(this.state.categoryid + this.state.catName + this.state.catDetail)

	handlenewName(event){
		this.setState({catName: event.target.value})
	}

	handlenewDetail(event){
		this.setState({catDetail: event.target.value})
	}

	render(){
		var categories = "";
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
					<h3 className="col-md-9">Update Category</h3>
					<div className="col-md-2">
					
					</div>
				</div>
				<label id="ErrorMsg"></label>
					<form className="col-md-4" onSubmit={this.submitForm} action="" method="PUT">
						<select className="form-control inputForm" value={this.state.categoryid} onChange={this.handlenewcategory.bind(this)}>
							<option value="" disabled hidden>Select Category</option>
							{categories}
						</select>
						<div className="fgroup" id="categorycontrols">
							<input className="inputForm form-control" value={this.state.catName} onChange={this.handlenewName.bind(this)} type="text" id="newName"  required />
							<input className="inputForm form-control" value={this.state.catDetail} onChange={this.handlenewDetail.bind(this)} type="text" id="newDetail" required />						
						</div>
						<button className="form-control btn btn-primary inputForm" type="Submit" value="Submit">Update Category</button> 
					</form>
				</div>
				</div>
			</div>
		)
	}
}