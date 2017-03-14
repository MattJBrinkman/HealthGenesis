import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../home';

export default class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="app-container">
      <div className="header jumbotron">
        <div className="container">
          <h1>Health Genesis!</h1>
        </div>
      </div>
      <div className="app-container__body">
        {this.props.children}
      </div>

      <Route path="/" component={Home} />
    </div>;
  }
}
