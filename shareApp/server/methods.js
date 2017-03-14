import web3 from '../imports/web3.js'
import getFutureAddress from './getFutureAddress.js';
import resource from '../imports/resource';

Meteor.methods({
  'create' : (recipient, url, resourceId, resourceType) => {
    console.log('create', recipient, url, resourceId);

    var futureAddress = getFutureAddress(web3.eth.accounts[0]);
    // fire and forget lol!!
    resource.new(url, recipient, resourceId, resourceType);
    return futureAddress;
  },
  'attach' : (address) => {
    console.log('attach', address);
    var instance = resource.contract.at(address);
    return instance.url();
  }
})
