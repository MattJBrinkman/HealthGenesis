import { Meteor } from 'meteor/meteor';
import shareEventListener from './shareEventListener';

import '../imports/sharesCollection';

Meteor.startup(() => {
  // code to run on server at startup

  shareEventListener();
});
