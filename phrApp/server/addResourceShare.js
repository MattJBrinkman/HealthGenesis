import SharesCollection from '../imports/sharesCollection';

export default (url, recipientAddress) => {
  console.log('addResourceShare', url, recipientAddress);
  SharesCollection.insert({
    recipientAddress : recipientAddress,
    url: url
  });
}
