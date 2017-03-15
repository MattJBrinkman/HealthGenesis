import React, { Component, PropTypes } from 'react';
import loGet from 'lodash/get';
import { Meteor } from 'meteor/meteor';

import loginWithEthereum from '../accounts-ethereum/loginWithEthereum.js';

import ExamList from '../exam-list';

import './home.less';

class Home extends Component {
  constructor(props) {
    super(props);

    this.onRegister = this.onRegister.bind(this);
    this.onLogin = this.onLogin.bind(this);

    this.state = {
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      const { currentUser } = this.context;
      const currentEthId = loGet(currentUser, 'services.ethereum.address');
      const newEthId = loGet(window, 'web3.eth.accounts[0]');
      if (currentEthId && newEthId !== currentEthId) {
        console.log('Ethereum account changed to', ethId);
        Meteor.logout();
      }
    }, 500);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  render() {
    const { currentUser } = this.context;
    const ethId = loGet(currentUser, 'services.ethereum.address');
    const isLoggedIn = !!ethId;
    const hasMetaMask = typeof window.mist === 'undefined' && window.web3;

    if (!hasMetaMask) {
      return <div className="home container">
        Please view this app using Google Chrome with the MetaMask extension installed.
      </div>;
    }

    return <div className="home container">
      <h1>Worklist</h1>
      {isLoggedIn
        ? <ExamList />
        : <div>
          <h2>Hello Stranger</h2>
          <p>
            Please <button className="btn btn-primary"
                           onClick={this.onRegister}>Register
          </button> or <button className="btn btn-primary"
                               onClick={this.onLogin}>Login</button>
          </p>
        </div>}
    </div>;
  }

  onRegister() {
    const ethId = loGet(window, 'web3.eth.accounts[0]');
    console.log('register', ethId);
    loginWithEthereum('topsecret', function (err, result) {
      if (err) {
        window.alert(err.reason);
      }
    });
  }

  onLogin() {
    const ethId = loGet(window, 'web3.eth.accounts[0]');
    console.log('login', ethId);
    loginWithEthereum(null, function (err, result) {
      if (err) {
        window.alert(err.reason);
      }
    });
  }
}

Home.contextTypes = {
  currentUser: PropTypes.object
};

export default Home;
