import { Meteor } from 'meteor/meteor';
import shareEventListener from './shareEventListener';

Meteor.startup(() => {
  // code to run on server at startup

  shareEventListener();
});
