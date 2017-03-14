import { Connect } from 'uport-connect'

let uport = new Connect('MyDApp')

Template.ethereumLogin.helpers({
});

Template.ethereumLogin.events({
  'click #uportLogon'(event, instance) {
    console.log('click..');
    uport.requestCredentials().then((credentials) => {
      console.log(credentials);
      //uport.getWeb3().eth.sign(web3.eth.defaultAccount, "test", (err, res) => {
      //  console.log(err, res);
      //});
    });
  },
  'click #web3Logon'(event, instance) {
    },

});
