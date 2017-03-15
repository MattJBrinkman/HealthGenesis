import React, { Component, PropTypes } from 'react';
import { Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import loGet from 'lodash/get';

import Home from '../home';

class Container extends Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    const { currentUser } = this.props;

    return {
      currentUser
    };
  }

  render() {
    const { currentUser } = this.props;
    const ethId = loGet(currentUser, 'services.ethereum.address');
    const isLoggedIn = !!ethId;

    return <div className="app-container">
      <div className="header jumbotron">
        <div className="container">
          <h1>Health Genesis!</h1>
        </div>
      </div>
      {isLoggedIn && <div className="container">
        Hello, {ethId}
        <button className="btn btn-primary pull-right" onClick={() => Meteor.logout()}>Log Out</button>
      </div>}
      <div className="app-container__body">
        {this.props.children}
      </div>

      <Route path="/" component={Home} />
    </div>;
  }
}

Container.childContextTypes = {
  currentUser: PropTypes.object
};

export default createContainer(() => {
  Meteor.subscribe('userData');

  const currentUser = Meteor.user();
  return {
    currentUser
  };
}, Container);
