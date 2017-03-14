import web3 from './externals/web3';

// TODO: pull accounts from collection
var accounts = [
  "0x5DFE021F45f00Ae83B0aA963bE44A1310a782fCC",
  "0xFE2b768a23948EDDD7D7Caea55bAa31E39045382",
  "0xA9a418dA22532Bd1189fF8Be5Cdaf3570bF9da43"
];

var resourceCreatedTopic = web3.sha3('ResourceCreated(address)');


export default () => {
  console.log('shareEventListner...');

  var filter = web3.eth.filter({
      topics: [
        resourceCreatedTopic
      ],
      fromBlock: 0
    });

  // go and get all the events
  filter.get(function(err, result) {
    if(err) {
      console.log("ERROR on filter:", err);
      return;
    }
    // iterate over the events and get the data we need for the table
    // using the blockNumber in the event object.  Specifying the blockNumber
    // is how we access prior state for a smart contract instance
    result.forEach(function(e) {
      console.log('e:', e);

    });
  });
};
