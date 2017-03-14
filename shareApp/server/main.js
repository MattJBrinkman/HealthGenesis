import { Meteor } from 'meteor/meteor';
import resource from '../imports/resource';
import web3 from '../imports/web3';
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

  Meteor.publish('userData', function () {
    return Meteor.users.find({ _id: this.userId },
      {
        fields: {
          'userRegistered': 1,
          'services.ethereum.address': 1
        }
      });
  });
});
