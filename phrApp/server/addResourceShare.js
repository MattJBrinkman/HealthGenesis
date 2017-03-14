import SharesCollection from '../imports/sharesCollection';

export default (url, recipientAddress, blockNumber, timeStamp) => {
  console.log('addResourceShare', url, recipientAddress);
  SharesCollection.insert({
    recipientAddress : recipientAddress,
    url: url,
    blockNumber: blockNumber,
    timeStamp : timeStamp
  });
}
