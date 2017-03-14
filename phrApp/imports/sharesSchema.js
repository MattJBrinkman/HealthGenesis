import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  recipientAddress: {
    type: String
  },
  url: {
    type: String
  }
});
