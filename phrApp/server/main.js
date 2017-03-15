import { Meteor } from 'meteor/meteor';
import shareEventWatcher from './shareEventWatcher';

import '../imports/externals/accounts-ethereum/server/register';
import '../imports/sharesCollection';

Meteor.startup(() => {
  // code to run on server at startup
  shareEventWatcher();

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
