import web3 from './externals/web3';
import addResourceShare from './addResourceShare';
import resource from './externals/resource';
import BlockHarvestStatus from '../imports/blockHarvestStatus';
import SharesCollection from '../imports/sharesCollection';

var resourceCreatedTopic = web3.sha3('ResourceCreated(address)');


export default () => {
  console.log('shareEventWatcher...');

  var blockHarvestStatus = BlockHarvestStatus.findOne();

  var filter = web3.eth.filter({
      topics: [
        resourceCreatedTopic
      ],
      fromBlock: blockHarvestStatus.lastBlock + 1
    });

  // go and get all the events
  filter.watch(Meteor.bindEnvironment(function(err, log) {
    if(err) {
      console.log("ERROR on filter:", err);
      return;
    }
    //console.log('log:', log);
    console.log('-->', log.address, '@', log.blockNumber);
    var instance = resource.contract.at(log.address);
    var url = instance.url();
    var recipient = instance.recipient();
    var resourceId = instance.resourceId();
    var resourceType = instance.resourceType();
    console.log('url', url);
    console.log('recipient', recipient);
    console.log('resourceId', resourceId);
    console.log('resourceType', resourceType);
    var blockNumber = log.blockNumber;
    var block = web3.eth.getBlock(log.blockNumber);
    //console.log(block);
    var timeStamp = new Date(block.timestamp * 1000);

    var wadoUriBaseUrl = resourceType == 'wadouri' ? url : '';
    var dicomWebBaseUrl = resourceType == 'wadors' ? url : '';

    // skip wadouri for now because we have problems with dup keys
    var share = SharesCollection.findOne({resourceId: resourceId});
    if(!share) {
      console.log('new share, inserting');
      // try to create new, will get exception on duplicate key enforced by mongo
      // Not ideal but best way to do it given time constraints
      SharesCollection.insert({
        recipientAddress : recipient,
        resourceId: resourceId,
        wadoUriBaseUrl: wadoUriBaseUrl,
        dicomWebBaseUrl: dicomWebBaseUrl,
        blockNumber: blockNumber,
        timeStamp : timeStamp
      }, function(err, result) {
        //console.log('err', err);
        var update = {};
        if(resourceType === 'wadouri') {
          update.wadoUriBaseUrl = wadoUriBaseUrl;
        } else if(resourceType === 'wadors') {
          update.dicomWebBaseUrl = dicomWebBaseUrl;
        }
        console.log('updating...', update);
        SharesCollection.update({resourceId: resourceId._id}, {$set: update});
      });
  } else {
    console.log('existing share, updating...');
    var update = {};
    if(resourceType === 'wadouri') {
      update.wadoUriBaseUrl = wadoUriBaseUrl;
    } else if(resourceType === 'wadors') {
      update.dicomWebBaseUrl = dicomWebBaseUrl;
    }
    console.log('updating...', update);
    SharesCollection.update({_id: share._id}, {$set: update});
  }

  BlockHarvestStatus.update(blockHarvestStatus._id, {$set: {lastBlock: log.blockNumber}});
  }));
};
