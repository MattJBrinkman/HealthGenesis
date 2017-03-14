import React, { Component, PropTypes } from 'react';

import ExamQuery from '../exam-query';
import qido from '../qido';

export default class ExamList extends Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);

    this.state = {
      results: []
    };
  }

  render() {
    return <div className="exam-list">
      <ExamQuery onSearch={this.onSearch} />

      {this.renderTable(this.state.results)}
    </div>;
  }

  renderTable(results) {
    return <table className="table">
      <thead>
      <tr>
        <th>Patient Name</th>
        <th>Patient ID</th>
        <th>Study UID</th>
      </tr>
      </thead>
      <tbody>
      {results.map((row, ix) => <tr key={ix}>
        {['PatientName', 'PatientID', 'StudyInstanceUID'].map(key => <td key={key}>{row[key]}</td>)}
      </tr>)}
      </tbody>
    </table>;
  }

  onSearch(query) {
    qido.search(this.props.qidoUrl, query)
      .then(results => {
        this.setState({ results });
      }, (err) => {
        alert(err);
      });
  }
}

ExamList.propTypes = {
  qidoUrl: PropTypes.string.isRequired
};
