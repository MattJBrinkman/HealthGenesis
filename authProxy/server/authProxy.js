import eutil from 'ethereumjs-util';
import http from 'http';
import httpProxy from 'http-proxy';
import HttpError from './HttpError';
import resource from '../imports/resource';
import url from 'url';
import web3 from '../imports/web3';

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
  // We just do wide open CORS for demonstration purposes.
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    return handleOptionsRequest(req, res);
  }
  try {
    // HACKHACKHACK - this is just an example - we're not doing any authorization on QIDO requests.
    if (!isQidoRequest(req)) {
      checkBlockChain(req);
    }
  } catch (err) {
    if (err instanceof HttpError) {
      console.log('refusing to proxy', req.url, 'error:', err);
      res.statusCode = err.statusCode;
    } else {
      console.log('unexpected error:', err);
      res.statusCode = 500;
    }
    res.end();
    return;
  }

  console.log('proxying', req.url);
  proxy.web(req, res, opts);
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
  const allowedHeaders = req.headers['access-control-request-headers'];

  if (allowedHeaders) {
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders);
  }
  res.setHeader('Access-Control-Max-Age', '86400');
  res.end();
}

function getRequestTimestamp(req, asInteger = true) {
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
  const timeLimitM = 5;
  if (delta > (60 * timeLimitM * 1000)) {
    throw new HttpError(403, 'Detected a time skew of more than ' + timeLimitM +
      'm. Rejecting request');
  }
}

function getSigFromHeaders(req) {
  return {
    r: Buffer.from(req.headers['x-secp256k1-r'], 'hex'),
    s: Buffer.from(req.headers['x-secp256k1-s'], 'hex'),
    v: parseInt(req.headers['x-secp256k1-v'])
  };
}

function getContractAddresses(req) {
  const list = req.headers['x-contractaddresses'].split(',');
  for (let i = 0; i < list.length; i++) {
    list[i] = list[i].trim();
  }
  return list;
}

function getContractAddress(req) {
  const list = getContractAddresses(req);
  if (list.length < 1) {
    throw new HttpError(400, 'bad x-contract-addresses header value: "' + list.join(',') + '"');
  }
  return list[0];
}

function getMessageHash(req) {
  const contractAddressesForSigning = getContractAddresses(req).slice(1);
  const requestTimestamp = getRequestTimestamp(req, false/* leave as string */);
  const message = contractAddressesForSigning.join('') + requestTimestamp;
  const hash = web3.sha3(message);
  return eutil.toBuffer(hash);
}

function getSignerAddress(req) {
  const sig = getSigFromHeaders(req);
  const msgHash = getMessageHash(req);
  const publicKey = eutil.ecrecover(msgHash, sig.v, sig.r, sig.s);
  return eutil.bufferToHex(eutil.publicToAddress(publicKey));
}

function getContractInstance(req) {
  const contractAddress = getContractAddress(req);
  return resource.contract.at(contractAddress);
}

function checkOwner(req, instance) {
  if (!validOwners.includes(instance.owner())) {
    throw new HttpError(403, 'owner is unknown:' + instance.owner());
  }
}

function checkRecipient(req, instance) {
  const signerAddress = getSignerAddress(req);
  if (instance.recipient() !== signerAddress) {
    throw new HttpError(403, 'signer\'s address: "' + signerAddress +
      '" does not match recipient: "' + instance.recipient() + '"');
  }
}

function checkUrl(req, instance) {
  const requestUrl = url.parse(req.url).pathname;
  const instanceUrl = url.parse(instance.url()).pathname;

  if (!requestUrl.startsWith(instanceUrl)) {
    throw new HttpError(403, 'client attempted an invalid access to "' + requestUrl + '" (1)');
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
      (requestUrl[instanceUrl.length] !== '/')) {
    throw new HttpError(403, 'client attempted an invalid access to "' + requestUrl + '" (2)');
  }
  // All good
}

function checkBlockChain(req) {
  checkTimeStamp(req);
  const instance = getContractInstance(req);
  checkOwner(req, instance);
  checkRecipient(req, instance);
  checkUrl(req, instance);
}
