import React, { Component } from 'react';

import ExamQuery from '../exam-query';
import ExamList from '../exam-list';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="home container">
      <ExamQuery/>
      <ExamList/>
    </div>;
  }
}
