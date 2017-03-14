const http = require('http');
const httpProxy = require('http-proxy');

// Proxy server which checks the block chain permission and then proxies the request
const opts = { target: 'http://localhost:8042'};

const proxy = httpProxy.createProxyServer({});

console.log('Running proxy...');

const server = http.createServer((req, res) => {
  const continueOn = checkBlockChain(req);
  if (continueOn) {
    proxy.web(req, res, opts);
  } else {
    res.statusCode= 403;
    res.end();
  }
}).listen(9042);

function checkBlockChain(req) {
  const xval = req.headers['x-special-proxy-header'];
  return (xval && xval === 'true');
}
