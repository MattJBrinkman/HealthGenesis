import http from 'http';
import httpProxy from 'http-proxy';
import resource from './externals/resource';
import web3 from './externals/web3';

// Proxy server which checks the block chain permission and then proxies the request
const opts = { target: process.env.PROXIED_SERVER };

const proxy = httpProxy.createProxyServer({});

console.log('Running proxy in front of ' + opts.target + '...');

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    return handleOptionsRequest(req, res);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  const continueOn = checkBlockChain(req);
  if (continueOn) {
    console.log('Proxying', req.url);
    proxy.web(req, res, opts);
  } else {
    res.statusCode = 403;
    res.end();
  }
}).listen(9042, function () {
  console.log('Ready at http://localhost:9042');
});

function handleOptionsRequest(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
  const allowedHeaders = req['access-control-allow-headers'];
  if (allowedHeaders) {
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders);
  }
  res.setHeader('Access-Control-Max-Age', '86400');
}

function checkBlockChain(req) {
  const xval = req.headers['x-special-proxy-header'];
  return (xval && xval === 'true');
}
