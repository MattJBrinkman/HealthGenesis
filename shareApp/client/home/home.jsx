import React, { Component, PropTypes } from 'react';
import loGet from 'lodash/get';
import { Meteor } from 'meteor/meteor';

import loginWithEthereum from '../../imports/accounts-ethereum/client/loginWithEthereum.js';

import Register from '../register';
import ExamList from '../exam-list';

import './home.less';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // qidoUrl: 'https://dicomcloud.azurewebsites.net/qidors/studies'
      // qidoUrl: 'http://pacsemulator.cloudapp.net:8042/dicom-web/studies'
      qidoUrl: 'http://localhost:9042/dicom-web/studies'
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ initialized: true }), 500);
  }

  render() {
    const { qidoUrl } = this.state;
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
      <h1>Medical Record Search</h1>
      {isLoggedIn
        ? <div>
          <div className="home__form">
            <div className="form-group">
              <label className="control-label">QIDO URL:</label>
              <input type="text"
                     className="form-control qidoUrl"
                     value={qidoUrl}
                     onChange={e => this.setState({ qidoUrl: e.target.value })} />
            </div>
          </div>
          <ExamList qidoUrl={qidoUrl} />
        </div>
        : <div>
          <p>
            Please <Register /> or <button className="btn btn-primary"
                                           onClick={this.onLogin}>Login</button>
          </p>
        </div>}
    </div>;
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
