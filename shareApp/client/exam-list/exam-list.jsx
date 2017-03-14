import React, { Component } from 'react';

export default class ExamList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="exam-list">
      <table className="table">
        <thead>
        <tr>
          <th>Column A</th>
          <th>Column A</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Column A</td>
          <td>Column B</td>
        </tr>
        </tbody>
      </table>
    </div>;
  }
}
