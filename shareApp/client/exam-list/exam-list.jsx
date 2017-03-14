import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

import ExamQuery from '../exam-query';
import qido from '../qido';
import createResource from '../createResource';

export default class ExamList extends Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.doShare = this.doShare.bind(this);

    this.state = {
      results: [],
      studyUid: null,
      recipientAddress: ''
    };
  }

  render() {
    return <div className="exam-list">
      <ExamQuery onSearch={this.onSearch} />

      {this.renderTable(this.state.results)}
      {this.renderModal()}
    </div>;
  }

  renderTable(results) {
    return <table className="table">
      <thead>
      <tr>
        <th>Patient Name</th>
        <th>Patient ID</th>
        <th>Study UID</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {results.map((row, ix) => <tr key={ix}>
        {['PatientName', 'PatientID', 'StudyInstanceUID'].map(key => <td key={key}>{row[key]}</td>)}
        <td>
          <button className="btn btn-primary" onClick={() => this.setState({ studyUid: row.StudyInstanceUID })}>
            <span className="glyphicon glyphicon-share" aria-hidden="true"></span> Share
          </button>
        </td>
      </tr>)}
      </tbody>
    </table>;
  }

  renderModal() {
    const { studyUid, recipientAddress } = this.state;
    return <Modal show={!!studyUid} onHide={this.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Share Exam</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label className="control-label">Recipient Address</label>
          <input type="text"
                 className="form-control"
                 value={recipientAddress}
                 onChange={e => this.setState({ recipientAddress: e.target.value })} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={this.doShare}>Share</Button>
        <Button onClick={this.closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>;
  }

  onSearch(query) {
    qido.search(this.props.qidoUrl, query)
      .then(results => {
        this.setState({ results });
      }, (err) => {
        alert(err);
      });
  }

  closeModal() {
    this.setState({
      studyUid: null,
      recipientAddress: ''
    });
  }

  doShare() {
    const { studyUid, recipientAddress } = this.state;
    // create the wado-rs uri
    var resourceId = studyUid;
    var wadoRsUri = this.props.qidoUrl + '/' + studyUid;
    createResource(wadoRsUri, recipientAddress, resourceId, 'wadors').then(() => {
      // create the wado-uri uri
      var wadoUriUrl = wadoRsUri.replace('dicom-web', 'wado');
      createResource(wadoUriUrl, recipientAddress, resourceId, 'wadouri').then(() => {
        this.closeModal();
      });
    });
  }
}

ExamList.propTypes = {
  qidoUrl: PropTypes.string.isRequired
};
