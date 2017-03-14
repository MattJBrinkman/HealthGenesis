import web3 from './externals/web3.js'
import getFutureAddress from './getFutureAddress.js';
import resource from './externals/resource';

Meteor.methods({
  'create' : (recipient, url) => {
    console.log('create', recipient, url);

    var futureAddress = getFutureAddress(web3.eth.accounts[0]);
    // fire and forget lol!!
    resource.new(url, recipient);
    return futureAddress;
  },
  'attach' : (address) => {
    console.log('attach', address);
    var instance = resource.contract.at(address);
    return instance.url();
  }
})
