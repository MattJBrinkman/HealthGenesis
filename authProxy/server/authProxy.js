import eutil from 'ethereumjs-util';
import http from 'http';
import httpProxy from 'http-proxy';
import HttpError from './HttpError';
import resource from './externals/resource';
import url from 'url';
import web3 from './externals/web3';

const validOwners = (() => {
  if (process.env.ETH_ACCOUNTS) {
    const validOwners = process.env.ETH_ACCOUNTS.split(',');

    for (let i = 0; i < validOwners.length; ++i) {
      validOwners[i] = validOwners[i].trim();
    }
    return validOwners;
  }
  return [web3.eth.accounts[0]];
})();

// Proxy server which checks the block chain permission and then proxies the request
const opts = { target: process.env.PROXIED_SERVER };

const proxy = httpProxy.createProxyServer({});
const port = parseInt(process.env.PROXY_PORT) || 9042;

console.log('Running proxy on port', port, 'in front of ' + opts.target + '...');

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    return handleOptionsRequest(req, res);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  // HACKHACKHACK - this is just an example - we're not doing any authorization on QIDO requests.
  const continueOn = isQidoRequest(req) || checkBlockChain(req);
  if (continueOn) {
    proxy.web(req, res, opts);
  } else {
    res.statusCode = 403;
    res.end();
  }
}).listen(port);

function isQidoRequest(req) {
  let path = url.parse(req.url).pathname;
  while (path.endsWith('/')) {
    path = path.substr(0, path.length - 1);
  }
  return path.endsWith('/studies');
}

function handleOptionsRequest(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
  const allowedHeaders = req['access-control-allow-headers'];
  if (allowedHeaders) {
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders);
  }
  res.setHeader('Access-Control-Max-Age', '86400');
}

// See https://github.com/chafey/ethereum-signed-http/blob/master/app/server/httpHandler.js

function getTimestamp(req, asInteger = true) {
  const timestampString = req.headers['x-timestamp'];
  if (!asInteger) {
    return timestampString;
  }
  const requestTimestamp = parseInt(timestampString);
  if (isNaN(requestTimestamp)) {
    throw new HttpError(400, 'missing or invalid x-timestamp header')
  }
  return requestTimestamp;
}

function checkTimeStamp(req) {
  const requestTimestamp = getRequestTimestamp(req);
  const now = Date.now();
  const delta = Math.abs(now - requestTimestamp);
  if (delta > 5000) {
    console.log('Detected a time skew of more than 5s. Rejecting request');
    throw new HttpError(403);
  }
}

function getSigFromHeaders(req) {
  return {
    r: Buffer.from(req.headers['x-secp256k1-r']),
    s: Buffer.from(req.headers['x-secp256k1-s']),
    v: Buffer.from(req.headers['x-secp256k1-v'])
  };
}

function getContractAddress(req) {
  return req.headers['x-contract-address'];;
}

function getMessageHash(req) {
  const contractAddress = getContractAddress(req);
  const requestTimestamp = getRequestTimestamp(req, false/* leave as string*/);
  const message = contractAddress + requestTimestamp;
  const hash = web3.sha3(message);
  return eutil.toBuffer(hash);
}

function getSignerAddress(req, contractAddress) {
  const sig = getSigFromHeaders(req);
  const msgHash = getMessageHash(req);
  const publicKey = eutil.ecrecover(msgHash, sig.v, sig.r, sig.s);
  return eutil.bufferToHex(eutil.publicToAddress(publicKey));
}

function getContractInstance(request) {
  const contractAddress = getContractAddress(req);
  return resource.contract.at(contractAddress);
}

function checkOwner(req, instance) {
  if (!validOwners.includes(instance.owner())) {
    console.log('owner is unknown:', instance.owner());
    throw HttpError(403);
  }
}

function checkRecipient(req, instance) {
  const signerAddress = getSignerAddress(req);
  if (instance.recipient() !== signerAddress) {
    console.log('signer\'s address: "' + signerAddress + '" does not match recipient: "' +
      instance.recipient() + '"');
    throw HttpError(403);
  }
}

function checkUrl(req, instance) {
  const requestUrl = req.url;
  const instanceUrl = instance.url();
  if (!requestUrl.startsWith(instanceUrl)) {
    console.log('client attempted an invalid access to"' + requestUrl + '"');
    throw new HttpError(403);
  }
  // Okay, the request URL starts with the contract's registered URL. Need to still check that
  // the request refers to a sub-resource of the contract's URL and isn't just a basic straight
  // prefix:
  //
  // Examples of acceptable URLs:
  //  Request URL: /aaa/bbb        Contract URL: /aaa/bbb
  //  Request URL: /aaa/bbb/ccc    Contract URL: /aaa/bbb
  //  Request URL: /aaa/bbb/ccc/d  Contract URL: /aaa/bbb
  //
  // Not acceptable:
  //  Request URL: /aaa/bbbb       Contract URL: /aaa/bbb
  //
  if ((requestUrl.length > instanceUrl.length) &&
      (requestUrl.length[instanceUrl.length] !== '/')) {
    console.log('client attempted an invalid access to"' + requestUrl + '"');
    throw new HttpError(403);
  }
  // All good
}

function checkBlockChain(req) {
  const xval = req.headers['x-special-proxy-header'];
  return (xval && xval === 'true');
}
