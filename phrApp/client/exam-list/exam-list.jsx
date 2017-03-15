import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import loGet from 'lodash/get';

import SharesCollection from '../../imports/sharesCollection';

function createViewerLaunchContext(study) {
  const payload = {
    wadoContract: study.wadoUriAddress,
    wadoRsContract: study.dicomWebAddress,
    wadoUri: study.wadoUriBaseUrl,
    wadoRsUri: study.dicomWebBaseUrl
  };

  return btoa(JSON.stringify(payload));
}

class ExamList extends Component {
  constructor(props) {
    super(props);

    this.launchViewer = this.launchViewer.bind(this);

    this.state = {
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
          <button className="btn btn-primary" onClick={() => this.launchViewer(row)}>
            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> View Images
          </button>
        </td>
      </tr>)}
      </tbody>
    </table>;
  }

  launchViewer(study) {
    const context = createViewerLaunchContext(study);
    window.open(`http://localhost:3004/viewer/${encodeURIComponent(study.resourceId)}?context=${encodeURIComponent(context)}`);
  }
}

ExamList.propTypes = {
};

export default createContainer(() => {
  const currentUser = Meteor.user();
  const ethId = loGet(currentUser, 'services.ethereum.address');
  if (ethId) {
    Meteor.subscribe('shares', ethId);
  }
  return {
    shares: SharesCollection.find({}).fetch(),
    currentUser
  };
}, ExamList);
