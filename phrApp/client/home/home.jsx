import React, { Component } from 'react';
import loGet from 'lodash/get';

import ExamList from '../exam-list';

import './home.less';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ethId: ''
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      const ethId = loGet(window, 'web3.eth.accounts[0]');
      if (ethId && ethId !== this.state.ethId) {
        console.log('Ethereum account changed to', ethId);
        this.setState({ ethId });
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
    const isLoggedIn = !!this.state.ethId;

    return <div className="home container">
      <h1>Worklist</h1>
      {isLoggedIn
        ? <ExamList ethId={this.state.ethId} />
        : <div>Hello Stranger, please authenticate yourself using MetaMask.</div>}
    </div>;
  }
}
