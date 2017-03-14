export default class HttpError {
  constructor(statusCode, message = '') {
    this.statusCode = statusCode;
    this.message = message || '';
  }
}
