import React, { Component } from 'react';
import ExamList from '../exam-list';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="home">
      Hello World
      <ExamList/>
    </div>;
  }
}
