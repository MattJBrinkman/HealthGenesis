import { Meteor } from 'meteor/meteor';
import resource from '../externals/resource';
import web3 from '../externals/web3';

Meteor.startup(() => {
  // code to run on server at startup

  const instance = resource.new('localhost:3200/dicomweb/studyUid', web3.eth.accounts[0]);



});
