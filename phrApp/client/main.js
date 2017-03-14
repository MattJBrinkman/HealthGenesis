import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Connect } from 'uport-connect'
//let uport = new Connect('MyDApp')

import './main.html';

Template.main.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.main.events({
  'click button'(event, instance) {
    uport.requestCredentials().then((credentials) => {
      console.log(credentials);
    });
  },
});
