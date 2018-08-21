import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import RouteWithProps from 'components/RouteWithProps';
import axios from 'axios';
export default class Portal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			bamboolean: {},
			transactions: [],
			toAccount: '',
			amount: '',
			transactionMessage: ''
		}

		this.handleTransaction = this.handleTransaction.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		axios.get("/getAccountAndTransactions").then((response) => {
			this.setState({
					bamboolean: response.data.bamboolean[0],
					transactions: response.data.transactions
				})
		}).catch(error => {
			console.log(error)
		});
	}

	handleChange(event){
		var newState = {};
		newState[event.target.name] = event.target.value;
		this.setState(newState);
	}

	handleTransaction(){
		if(this.state.amount < 0) {this.setState({transactionMessage: "You wish."}); return;}
		if(this.state.amount == 0) {this.setState({transactionMessage: "Send more Bambeuros."}); return}
		if(this.state.amount < 0.01) {this.setState({transactionMessage: "Minimum amount is 0.01."}); return}
		axios.post("/makeTransaction", {
			accountId: this.state.bamboolean.account[0].id,
			toAccount: parseInt(this.state.toAccount),
			amount: parseFloat(this.state.amount)
		}).then(response => {
			if(!response){
				this.setState({transactionMessage: "Transaction failed."});
			} else if(response.data.error) this.setState({transactionMessage: response.data.error});
			else {
				var newBamboolean = {...this.state.bamboolean};
				newBamboolean.account = response.data.account;
				var newTransactions = [...this.state.transactions];
				newTransactions.unshift(response.data.transaction);
				this.setState({
					bamboolean: newBamboolean,
					transactions: newTransactions,
					transactionMessage: "Transaction succeeded."
				})
			}
		}).catch(error => {
			console.log(error)
		});
	}

	render(){
		return(
			<div>
				{ this.state.bamboolean.account ? (
					<div>
						<p><span>Account ID: </span><span>{this.state.bamboolean.account[0].id}</span></p>
						<p><span>Email: </span><span>{this.state.bamboolean.email}</span></p>
						<p><span>Bambeuros: </span><span>{(this.state.bamboolean.account[0].bambeuros).toFixed(2)}</span></p>
						<p>Make transaction:
							<input value={this.state.toAccount} onChange={this.handleChange} id="toAccount" name="toAccount" type="text" placeholder="Account ID" />
							<input value={this.state.amount} onChange={this.handleChange} id="amount" name="amount" type="number" placeholder="Amount" />
							<button type="button" onClick={this.handleTransaction} >Make transaction</button>
						</p>
						{this.state.transactionMessage ? <p>{this.state.transactionMessage}</p> : ''}
						<h4>Transactios:</h4>
						<table className="table table-striped">
						<thead><tr><th>Date</th><th>To</th><th>From</th><th>Bambeuros in</th><th>Bambeuros out</th><th>Type</th></tr></thead>
						<tbody>{this.state.transactions ? (
							this.state.transactions.map((transaction, index) => 
								<tr key={index}><td>{transaction.date}</td><td>{transaction.to}</td><td>{transaction.from}</td><td>{transaction.type == "credit" ? transaction.amount : ''}</td><td>{transaction.type == "debit" ? transaction.amount : ''}</td><td>{transaction.type}</td></tr>
								)
							) : ''}
						</tbody></table>
					</div>
			) : ''}

			</div>
			);
	}
}