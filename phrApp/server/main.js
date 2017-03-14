import { Meteor } from 'meteor/meteor';
import shareEventWatcher from './shareEventWatcher';

import '../imports/sharesCollection';

Meteor.startup(() => {
  // code to run on server at startup

  shareEventWatcher();
});
