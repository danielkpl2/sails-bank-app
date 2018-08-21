import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import RouteWithProps from 'components/RouteWithProps';
export default class LoginForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			confirmation: '',
			newemail: '',
			newpassword: '',
			active: 'signup'
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		var newState = {};
		newState[event.target.name] = event.target.value;
		this.setState(newState);
	}

	render(){

		return(
			
			<div>
				<div className="text-center">
					<div style={{margin: '0 auto', width: '45%', background: 'whitesmoke', display: 'inline-block', borderRadius: '4px'}}>
						
						<div style={{padding: "30px"}}>
							<div style={{height: "auto", overflow: "auto"}}>
								<NavLink className={"col-md-6 login-left"} activeClassName="login-active" exact to={this.props.newButton}>{this.props.newString}</NavLink>
								<NavLink className={"col-md-6 login-right"} activeClassName="login-active" to={this.props.loginButton}>{this.props.loginString}</NavLink>
							</div>
							
							<RouteWithProps exact path={this.props.newButton} component={Create} 
								register={this.props.register}
								newemail={this.state.newemail}
								newpassword={this.state.newpassword}
								confirmation={this.state.confirmation}
								handleChange={this.handleChange}
							/>
							<RouteWithProps path={this.props.loginButton} component={Login} 
								login={this.props.login}
								email={this.state.email}
								password={this.state.password}
								handleChange={this.handleChange}
							/>

							
						</div>
					</div>
				</div>

			</div>
			
			);
	}
}

class Create extends React.Component {
	render(){
		return(
			<form className="form-horizontal" method="post" action={this.props.register}>
				<h4>Sign up</h4>
				<div className="">
						<input style={{marginBottom: "20px"}} className="form-control"
						 name="newemail"
						 type="text"
						 value={this.props.newemail}
						 placeholder="Email"
						 onChange={this.props.handleChange}
						  />
					
						<input style={{marginBottom: "20px"}} className="form-control"
						 name="newpassword"
						 type="password"
						 value={this.props.newpassword}
						 placeholder="Password"
						 onChange={this.props.handleChange} />
					
						<input style={{marginBottom: "20px"}} className="form-control"
						 name="confirmation"
						 type="password"
						 value={this.props.confirmation}
						 placeholder="Confirm password"
						 onChange={this.props.handleChange} />
					
					<input className="btn btn-default"
					 type="submit" value="Continue" />
				</div>
			</form>
			);
	}
}

class Login extends React.Component {
	render(){
		return(
			<form className="form-horizontal" method="post" action={this.props.login}>
				<h4>Login</h4>

				<div className="">
						<input style={{marginBottom: "20px"}} className="form-control"
						 name="email"
						 type="text"
						 value={this.props.email}
						 placeholder="Email"
						 onChange={this.props.handleChange}
						  />
					
						<input style={{marginBottom: "20px"}} className="form-control"
						 name="password"
						 type="password"
						 value={this.props.password}
						 placeholder="Password"
						 onChange={this.props.handleChange} />
					<input className="btn btn-default"
					 type="submit" value="Login" />
				</div>
			</form>
			);
	}
}

LoginForm.propTypes = {
		register: PropTypes.string,
		login: PropTypes.string,
		newString: PropTypes.string,
		loginString: PropTypes.string,
		newButton: PropTypes.string,
		loginButton: PropTypes.string
};

Create.propTypes = {
		register: PropTypes.string,
		newemail: PropTypes.string,
		newpassword: PropTypes.string,
		confirmation: PropTypes.string,
		handleChange: PropTypes.func,
};

Login.propTypes = {
		login: PropTypes.string,
		email: PropTypes.string,
		password: PropTypes.string,
		handleChange: PropTypes.func,
};