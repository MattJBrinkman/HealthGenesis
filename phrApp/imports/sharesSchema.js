import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  recipientAddress: {
    type: String
  },
  resourceId: {
    type: String
  },
  wadoUriAddress: {
    type: String,
    optional: true
  },
  wadoUriBaseUrl: {
    type: String,
    optional: true
  },
  dicomWebAddress: {
    type: String,
    optional: true
  },
  dicomWebBaseUrl: {
    type: String,
    optional: true
  },
  blockNumber: {
    type: Number
  },
  timeStamp: {
    type: Date
  }
});
