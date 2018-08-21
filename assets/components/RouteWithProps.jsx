import React, { Component } from 'react';
import { Route } from 'react-router-dom';
export default class RouteWithProps extends Component {
  render(){
    const { path, exact, strict, component:Component, location, ...rest } = this.props;
    return(
      <Route
		    path={path}
		    exact={exact}
		    strict={strict}
		    location={location}
		    render={function(props){return(<Component {...props} {...rest}  />) } } />
    );
  }
}
