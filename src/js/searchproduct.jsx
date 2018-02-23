import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

export default class SearchProdut extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searchText : "",
			productList : [],
		}

		this.handleSearchText = this.handleSearchText.bind(this);
		this.getProductList = this.getProductList.bind(this);
		this.handleProductError = this.handleProductError.bind(this);

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
			console.log(err)
			this.handleProductError("Error: "+err)
		})
	}

	handleSearchText(event){
		this.setState({ searchText : event.target.value})
	}

	handleProductError(msg){
		$("$errorMsg").text(msg);
	}

	render(){

		const rows = [];
		var prevCategory = null;
		var catName = null;
		this.state.productList.filter(function(product, index){
			if(product.name.indexOf(this.state.searchText) > -1)
				rows.push(
						<tr>
					        <td>{product.name}</td>
					        <td>{product.id}</td>
					     </tr>
					)
			if(product.category.name != prevCategory)
				rows.push(
						<tr>
					        <th colSpan="2">
					          {catName}
					        </th>
					    </tr>
					)
			catName = product.category.name;
		})

		return(
			<div>
			<label id="errorMsg"></label>
				<form className="">
					<input type="text" value={this.state.searchText} onChange={this.handleSearchText} className="form-control formInput searchBar" placeholder="Search Prouct" />
				</form>

				<table>
			        <thead>
			          <tr>
			            <th>Name</th>
			            <th>ID</th>
			          </tr>
			        </thead>
			        <tbody>
			        	{rows}
			        </tbody>
			     </table>
			    </div>
			)
	}


}