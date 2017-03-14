/*

NOTE that this doesn't need to be a meteor app. It was made a meteor app only
to avoid wasting time with raw node packages and the new es6 import capability
when consuming source from ../lib.

 */

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
