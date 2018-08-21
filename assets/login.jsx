import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import LoginForm from 'components/LoginForm';

ReactDom.render(
	<Router>
	<LoginForm
		newButton="/bamboolean/new"
		loginButton="/bamboolean/login"
		register="/bamboolean/create" login="/bamboolean/login"
		newString="New Bamboolean"
		loginString="Bamboolean Login"
	/></Router>,
	document.getElementById('Login')
	);
// ReactDom.render(
//   <Router>
//     <Switch>
//       <Route path="/" exact component={App} />
//       <Route component={NotFound} />
//     </Switch>
//   </Router>, document.getElementById('app')) 
