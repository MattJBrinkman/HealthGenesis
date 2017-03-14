import Resources from './collections/resources';
import web3 from './externals/web3';
import getFutureAddress from './getFutureAddress';
import resource from './externals/resource';

export default function() {
  // TEST CODE - add a smart contract instance if one doesn't already exist
  // for testing

  var resourceDoc = Resources.findOne();
  if(!resourceDoc) {
    var futureAddress = getFutureAddress(web3.eth.accounts[0]);
    resource.new('localhost:3200/dicomweb/studyUid', web3.eth.accounts[0]).then((address) => {
      console.log("Contract Mined: ", address);

      Resources.insert({
        address: futureAddress
      });
    }, (error) => {
      console.log("WARNING - failed to create smart contract instance!", error);
    });
    return futureAddress;
  } else {
    return resourceDoc.address;
  }
}
