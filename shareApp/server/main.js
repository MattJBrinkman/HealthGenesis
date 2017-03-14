import { Meteor } from 'meteor/meteor';
import resource from '../../lib/resource';
import web3 from '../../lib/web3.js';

Meteor.startup(() => {
  // code to run on server at startup

  var instance = resource.new('localhost:3200/dicomweb/studyUid', web3.eth.accounts[0]);



});
