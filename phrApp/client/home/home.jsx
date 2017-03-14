import React, { Component } from 'react';

import ExamList from '../exam-list';

import './home.less';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return <div className="home container">
      <h1>Worklist</h1>
      <ExamList />
    </div>;
  }
}
