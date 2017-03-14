import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  recipientAddress: {
    type: String
  },
  resourceId: {
    type: String
  },
  wadoUriBaseUrl: {
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
