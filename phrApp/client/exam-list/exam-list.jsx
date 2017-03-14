import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import SharesCollection from '../../imports/sharesCollection';

class ExamList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [{
        senderAddress: '0xDEADBEEF',
        url: 'http://www.example.com'
      }]
    };
  }

  render() {
    return <div className="exam-list">
      {this.renderTable(this.props.shares)}
    </div>;
  }

  renderTable(shares) {
    return <table className="table">
      <thead>
      <tr>
        <th>Timestamp</th>
        <th>Block#</th>
        <th>StudyUID</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {shares.map((row, ix) => <tr key={ix}>
      <td>{row.timeStamp.toString()}</td>
      <td>{row.blockNumber}</td>
        <td>{row.resourceId}</td>
        <td>
          <a href={row.url} target="_blank" className="btn btn-primary">
            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> View Images
          </a>
        </td>
      </tr>)}
      </tbody>
    </table>;
  }
}

ExamList.propTypes = {
  ethId: PropTypes.string.isRequired
};

export default createContainer((props) => {
  Meteor.subscribe('shares', props.ethId);
  return {
    shares: SharesCollection.find({}).fetch()
  };
}, ExamList);
