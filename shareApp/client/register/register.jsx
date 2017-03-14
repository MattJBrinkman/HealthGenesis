import React, { Component } from 'react';

import loginWithEthereum from '../accounts-ethereum/loginWithEthereum.js';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onRegister = this.onRegister.bind(this);

    this.state = {
      regCode: '',
      isRegistering: false
    };
  }

  render() {
    const { isRegistering, regCode } = this.state;

    return isRegistering
      ? <div className="form-group form-inline">
        <div className="help-block">enter the registration code provided by your doctor (&quot;topsecret&quot;)</div>
        <label className="sr-only">Registration Code</label>
        <input type="text"
               className="form-control"
               value={regCode}
               onChange={e => this.setState({ regCode: e.target.value })}
               placeholder="Registration Code" />
        <button className="btn btn-primary"
                onClick={this.onRegister}>Register</button>
      </div>
      : <button className="btn btn-primary"
                onClick={() => this.setState({ isRegistering: true })}>Register
      </button>;
  }

  onRegister() {
    const { regCode } = this.state;
    if (!regCode) {
      window.alert('Please enter your registration code.');
      return;
    }
    loginWithEthereum(regCode, function (err, result) {
      if (err) {
        window.alert(err.reason);
      }
    });
  }
}

