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
			this.handleProductError("Error: "+err)
		})
	}

	handleSearchText(event){
		this.setState({ searchText : event.target.value})
	}

	handleProductError(msg){
		$("#errorMsg").text(msg);
	}

	render(){

		const rows = [];
		var prevCategory = "";
		if(this.state.searchText){
			
			this.state.productList.filter(function(product, index){
				if((product.name.toLowerCase()).indexOf(this.state.searchText.toLowerCase()) > -1){

					var vendor= [];
					
					// product.vendors.map(function(vend, index){
					// 	vendor.push(`${vend.name}<\br>`)
					// })
					if(product.category.name !== prevCategory)
					rows.push(
							<tr>
						        <th colSpan="2">
						          {product.category.name}
						        </th>
						    </tr>
						)

					rows.push(
							<tr>
						        <td>{product.name}</td>
						        <td>{product.id}</td>
						        <td>{vendor}</td>
						     </tr>
					)
						
				prevCategory = product.category.name;
				}	

			}, this)

		}		

		return(
			<div className="col-md-10" style={{'margin' : '20px'}}>
			<label id="errorMsg"></label>
				<form style={{'margin' : '20px 20px 20px 0px'}}>
					<input type="text" value={this.state.searchText} onChange={this.handleSearchText} className="form-control formInput searchBar" placeholder="Search Prouct" />
				</form>

				<table className=" table-hover searchTable">
			        <thead>
			          <tr>
			            <th>Name</th>
			            <th>ID</th>
			            <th>Vendors</th>
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