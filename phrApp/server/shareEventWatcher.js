import web3 from './externals/web3';
import addResourceShare from './addResourceShare';
import resource from './externals/resource';
import BlockHarvestStatus from '../imports/blockHarvestStatus';

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
    // iterate over the events and get the data we need for the table
    // using the blockNumber in the event object.  Specifying the blockNumber
    // is how we access prior state for a smart contract instance
    //console.log('log:', log);
    console.log('-->', log.address, '@', log.blockNumber);
    var instance = resource.contract.at(log.address);
    var url = instance.url();
    var recipient = instance.recipient();

    addResourceShare(url, recipient);

    BlockHarvestStatus.update(blockHarvestStatus._id, {$set: {lastBlock: log.blockNumber}});
  }));
};
