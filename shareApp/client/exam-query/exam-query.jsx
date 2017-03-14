import React, { Component, PropTypes } from 'react';
import dicomTags from '../qido/dicomTags';

export default class ExamQuery extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      patientName: '',
      mrn: ''
    };
  }

  render() {
    const { patientName, mrn } = this.state;
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
          <label className="sr-only">MRN</label>
          <input type="text"
                 className="form-control"
                 value={mrn}
                 onChange={e => this.setState({ mrn: e.target.value })}
                 placeholder="MRN" />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
    </div>;
  }

  onSubmit(e) {
    e.preventDefault();

    const { patientName, mrn } = this.state;

    this.props.onSearch({
      [dicomTags.byName.PatientName]: patientName,
      [dicomTags.byName.PatientID]: mrn
    });

    return false;
  }
}

ExamQuery.propTypes = {
  onSearch: PropTypes.func
};

ExamQuery.defaultProps = {
  onSearch: () => {}
};
