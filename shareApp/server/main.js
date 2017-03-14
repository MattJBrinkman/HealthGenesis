import { Meteor } from 'meteor/meteor';
import resource from './resource';
import web3 from './web3.js';

Meteor.startup(() => {
  // code to run on server at startup

  var instance = resource.new('localhost:3200/dicomweb/studyUid', web3.eth.accounts[0]);



});
