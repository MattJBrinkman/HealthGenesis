import React, { Component } from 'react';

export default class ExamQuery extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      patientName: ''
    };
  }

  render() {
    const { patientName } = this.state;
    return <div className="exam-query">
      <form onSubmit={this.onSubmit} className="form-inline">
        <div className="form-group">
          <label className="sr-only">Patient Name</label>
          <input type="text"
                 className="form-control"
                 value={patientName}
                 onChange={e => this.setState({ patientName: e.target.value })}
                 placeholder="Patient Name" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
    </div>;
  }

  onSubmit(e) {
    e.preventDefault();

    return false;
  }
}
