import { Meteor } from 'meteor/meteor';
import resource from './externals/resource';
import web3 from './externals/web3';
import getOrCreateTestInstanceAddress from './getOrCreateTestInstanceAddress';

Meteor.startup(() => {
  // code to run on server at startup


  var address = getOrCreateTestInstanceAddress();
  console.log('using test instance @ ', address);
  try {
    var instance = resource.contract.at(address);
    console.log('owner:', instance.owner());
    console.log('url:', instance.url());
    console.log('recipient:', instance.recipient());
  } catch(err) {
    console.log("ERROR accessing smart contract instance", err);

  }
});
