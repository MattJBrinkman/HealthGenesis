import React, { Component } from 'react';

import ExamList from '../exam-list';

import './home.less';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // qidoUrl: 'https://dicomcloud.azurewebsites.net/qidors/studies'
      qidoUrl: 'http://pacsemulator.cloudapp.net:8042/dicom-web/studies'
    };
  }

  render() {
    const { qidoUrl } = this.state;
    return <div className="home container">
      <div className="home__form">
        <div className="form-group">
          <label className="control-label">QIDO URL:</label>
          <input type="text"
                 className="form-control qidoUrl"
                 value={qidoUrl}
                 onChange={e => this.setState({ qidoUrl: e.target.value })} />
        </div>
      </div>
      <ExamList qidoUrl={qidoUrl} />
    </div>;
  }
}
