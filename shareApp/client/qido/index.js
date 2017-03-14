// TODO: Add QIDO client code

function buildQueryString(query) {
  return Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key])}`).join('&');
}

export default function search(url, query) {
  return fetch(url + '?' + buildQueryString(query));
}
