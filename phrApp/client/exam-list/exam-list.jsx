import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import loGet from 'lodash/get';

import SharesCollection from '../../imports/sharesCollection';

class ExamList extends Component {
  constructor(props) {
    super(props);

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
        <th>URL</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {shares.map((row, ix) => <tr key={ix}>
        <td>{row.url}</td>
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
