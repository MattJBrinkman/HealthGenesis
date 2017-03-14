pragma solidity ^0.4.2;

contract Resource {

  // The account that created this resource
  address public owner;

  // Base URL to a resource
  string public url;

  // The address of the recipient who has access to the resource.  The recipient
  // can access the resource by signing the request using web3.eth.sign().
  // The resource server can validate the signature to ensure the
  // recipient owns the private key.
  address public recipient;

  function Resource(address _recipient, string _url) {
    owner = mesg.sender;
    recipient = _recipient;
    url = _url;
  }

}
