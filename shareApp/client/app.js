import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import Router from './router.jsx';

Meteor.startup(function () {
  render(<Router />, document.getElementById('render-target'));
});
